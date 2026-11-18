import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { productData } from "../data/products";
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react";

const navLink = [
  { name: "Home", to: "/" },
  { name: "Electronics", to: "/category/electronics" },
  { name: "Fashion", to: "/category/fashion" },
  { name: "Home & Living", to: "/category/home-living" },
  { name: "Beauty & Personal Care", to: "/category/beauty" },
  { name: "Accessories", to: "/category/accessories" }
];

const iconLink = [
  { icon: <Heart />, url: "/wishlist", label: "Wishlist" },
  { icon: "cart", url: "/cart", label: "Shopping cart" },
];

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProducts = productData.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  return (
    <header className="relative">
      <nav className=" flex justify-between items-center px-3 sm:px-5 md:px-8 py-4 border-b border-border w-full min-w-0">
        {/* LOGO */}
        <div className="text-center shrink-0">
          <NavLink to="/">
            <p className="text-lg font-bold text-charcoal">
              <span className="text-electric-blue">Shop</span>Ease
            </p>
          </NavLink>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex justify-center items-center gap-5 ">
          {navLink.map((nav) => (
            <NavLink
              key={nav.name}
              to={nav.to}
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium  ${
                  isActive
                    ? "text-electric-blue underline"
                    : "text-muted-grey  hover:text-electric-blue"
                }`
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-2 sm:gap-3 text-charcoal shrink-0">
          {/* search btn */}
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsOpen(false);
            }}
            aria-label="Search products"
            aria-expanded={isSearchOpen}
            className="transition-colors duration-200 hover:text-electric-blue"
          >
            <Search size={22} />
          </button>
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
          <Link to="/signup" className="btn primary-btn hidden sm:block">Sign In</Link>

          {/* Menu Btn */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsSearchOpen(false);
            }}
            className="lg:hidden transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* SEARCH */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-border shadow-md p-5 z-50">
          <div className="max-w-3xl mx-auto flex items-center gap-3 border border-border rounded-lg px-4 py-3">
            <Search size={20} className="text-muted-grey" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full outline-none bg-transparent text-sm"
              autoFocus
            />

            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchTerm("");
              }}
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {searchTerm.trim() && (
            <div className="max-w-3xl mx-auto mt-3 bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearchTerm("");
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-3 text-left hover:bg-soft-grey transition-colors"
                  >
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />

                    <div>
                      <p className="font-medium text-sm text-charcoal">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-grey">
                        ₦{product.price.toLocaleString("en-NG")}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="p-4 text-sm text-muted-grey text-center">
                  No products found.
                </p>
              )}
            </div>
          )}
        </div>
      )}

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
