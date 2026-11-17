import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Cart from "./pages/Cart"
import Categories from "./pages/Categories"
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
    <AnnouncementBar/>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </div>
  );
}

export default App;