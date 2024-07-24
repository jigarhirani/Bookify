import { Routes, Route } from "react-router-dom";

// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrderPage from "./pages/ViewOrders";
import ViewOrderDetails from "./pages/ViewOrderDetail";

// CSS
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books/list" element={<ListingPage />} />
        <Route path="/books/view/:bookId" element={<BookDetailPage />} />
        <Route path="/books/orders" element={<OrderPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
