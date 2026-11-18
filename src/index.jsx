import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderConfirmation from "./pages/OrderConfirmation";

import SignUp from "./pages/SignUp";

function Index() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Routes>
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
     
    </div>
    
  );
}

export default Index;
