import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { useFirebase } from "../context/Firebase";

const RegisterPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");

    useEffect(() => {
        if (firebase.isLoggedIn) {
            // navigate to home
            navigate("/");
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await firebase.signIn(email, password);
    };

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group
                    onChange={e => setPasswrod(e.target.value)}
                    value={password}
                    className="mb-3"
                    controlId="formBasicPassword"
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;