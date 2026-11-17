import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react";

const navLink = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
  { name: "Categories", to: "/categories" },
  { name: "About", to: "/about" },
];

const iconLink = [
  {
    icon: <Search />,
    url: "/",
    label: "Search Products",
    className: "lg:hidden",
  },
  { icon: <Heart />, url: "/", label: "Wishlist" },
  { icon: "cart", url: "/cart", label: "Shopping cart" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <header className="relative">
      <nav className=" flex justify-between items-center px-3 sm:px-5 md:px-8 py-4 border-b border-border w-full min-w-0">
        {/* LOGO */}
        <div className="text-center shrink-0">
          <NavLink to="/">
          <p className="text-lg font-bold text-charcoal">
            <span className="text-electric-blue">Shop</span>Ease
          </p></NavLink>
          
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex justify-center items-center gap-8">
          {navLink.map((nav) => (
            <NavLink
              key={nav.name}
              to={nav.to}
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive
                    ? "text-electric-blue underline"
                    : "text-charcoal hover:text-electric-blue"
                }`
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-2 sm:gap-3 text-charcoal shrink-0">
          <div className="hidden lg:flex items-center gap-2 border border-border rounded-lg md:px-3 py-3 px-2 w-36 sm:w-40 md:w-62.5 lg:w-75">
            <Search size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="outline-none w-full bg-transparent text-charcoal text-sm md:text-[15px]"
            />
          </div>
          {iconLink.map((icon) => (
            <NavLink
              key={icon.label}
              to={icon.url}
              aria-label={icon.label}
              className={`transition-colors duration-200 hover:text-electric-blue ${icon.className || ""}`}
            >
              {icon.icon === "cart" ? (
                <div className="relative">
                  <ShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-electric-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              ) : (
                icon.icon
              )}
            </NavLink>
          ))}

          {/* Sign in btn*/}
          <button className="btn primary-btn hidden sm:block">Sign In</button>

          {/* Menu Btn */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      <div className="lg:hidden">
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-border p-5 shadow-md lg:hidden z-50">
            <div className="flex flex-col gap-5">
              {navLink.map((nav) => (
                <NavLink
                  key={nav.name}
                  to={nav.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-electric-blue"
                        : "text-charcoal hover:text-electric-blue"
                    }`
                  }
                >
                  {nav.name}
                </NavLink>
              ))}
              <button className="btn primary-btn sm:hidden">Sign In</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
