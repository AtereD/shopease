import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderConfirmation from "./pages/OrderConfirmation";
import CategoryShop from "./pages/CategoryShop";
import ProductDetails from "./pages/ProductDetails";
import WishList from "./pages/WishList";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const location = useLocation();

const isAuthPage = ["/signup", "/signin"].includes(location.pathname);
  return (
    <main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      {!isAuthPage && (
  <>
    <AnnouncementBar />
    <Navbar />
  </>
)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category/:slug" element={<CategoryShop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      </Routes>
      {!isAuthPage && <Footer />}
    
    </main>
  );
}

export default App;
