import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";


const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBYN46LVXxucs7gymqUCQMquJF-QmZYrSE",
    authDomain: "bookify-47b12.firebaseapp.com",
    projectId: "bookify-47b12",
    storageBucket: "bookify-47b12.appspot.com",
    messagingSenderId: "38435615502",
    appId: "1:38435615502:web:edd15002b765ca72231d5f"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fierStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if (user) setUser(user);
            else setUser(null);
        })
    }, []);

    const signupUserWithEmailAndPassword = (email, passwrod) =>
        createUserWithEmailAndPassword(firebaseAuth, email, passwrod);

    const signinWithEmailAndPass = (email, passwrod) =>
        signInWithEmailAndPassword(firebaseAuth, email, passwrod);

    const siginWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`);
        const uploadResult = await uploadBytes(imageRef, coverPic);
        await addDoc(collection(fierStore, "books"), {
            name,
            isbnNumber: Number(isbnNumber),
            price: Number(price),
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
    };

    const listAllBooks = () => {
        return getDocs(collection(fierStore, "books"));
    };

    const getBookById = async (id) => {
        const docRef = doc(fierStore, "books", id);
        const result = await getDoc(docRef);
        return result;
    };

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
    };

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(fierStore, "books", bookId, "orders");
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),
        });
        return result;
    };

    const fetchMyBooks = async (userId) => {
        const collectionRef = collection(fierStore, "books");
        const q = query(collectionRef, where("userID", "==", userId));

        const result = await getDocs(q);
        return result;
    };

    const getOrders = async (bookId) => {
        const collectionRef = collection(fierStore, "books", bookId, "orders");
        const result = await getDocs(collectionRef);
        return result;
    }

    const isLoggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            signinWithEmailAndPass,
            siginWithGoogle,
            isLoggedIn,
            handleCreateNewListing,
            listAllBooks,
            getImageURL,
            getBookById,
            placeOrder,
            fetchMyBooks,
            user,
            getOrders
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}