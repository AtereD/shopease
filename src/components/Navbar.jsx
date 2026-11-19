import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { productData } from "../data/products";
import { Heart, Search, ShoppingCart, Menu, X, UserRound } from "lucide-react";
import { toast } from "react-toastify";

const navLink = [
  { name: "Home", to: "/" },
  { name: "Electronics", to: "/category/electronics" },
  { name: "Fashion", to: "/category/fashion" },
  { name: "Home & Living", to: "/category/home-living" },
  { name: "Beauty & Personal Care", to: "/category/beauty" },
  { name: "Accessories", to: "/category/accessories" },
];

const iconLink = [
  { icon: <Heart  size={20}/>, url: "/wishlist", label: "Wishlist" },
  { icon: "cart", url: "/cart", label: "Shopping cart" },
];

const Navbar = () => {
  const { user, loading, signOut } = useContext(AuthContext);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { wishListItems } = useContext(WishlistContext);
  const wishlistCount = wishListItems.length;
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

  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error("Unable to log out. Please try again.");
      return;
    }

    setIsAccountOpen(false);
    toast.success("You have logged out successfully!");
    navigate("/");
  };

  return (
    <header className="relative px-3 sm:px-5 md:px-8 py-4 border-b border-border">
      <nav className=" flex justify-between items-center  w-full min-w-0">
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
        <div className="flex items-center gap-2  text-charcoal shrink-0">
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
            <Search size={20} />
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
                  <ShoppingCart size={20}/>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              ) : (
                <div className="relative">
                  {icon.icon}
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}

          {/* Sign in btn*/}
          {!loading && (
            <div className="relative hidden lg:block">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-border hover:bg-soft-grey transition-colors"
                    aria-label="My account"
                    aria-expanded={isAccountOpen}
                  >
                    <UserRound size={18} className="text-electric-blue" />
                  </button>

                  {isAccountOpen && (
                    <div className="absolute right-0 top-full mt-3 w-52 bg-white border border-border rounded-xl shadow-lg p-2 z-50">
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-sm font-medium text-charcoal">
                          {user.user_metadata?.full_name || "My Account"}
                        </p>
                        <p className="text-xs text-muted-grey truncate">
                          {user.email}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-soft-grey rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/signin" className="btn primary-btn">
                  Sign In
                </Link>
              )}
            </div>
          )}

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
            {isOpen ? <X size={23} /> : <Menu size={23} />}
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
      <div className="lg:hidden w-full">
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-border p-5 shadow-md lg:hidden z-50">
            <div className="flex flex-col gap-5">
              {!loading &&
                (user ? (
                  <div className="border-b border-border pt-2">
                    <div className="flex items-center gap-3  mb-3">
                      <div className="w-10 h-10 rounded-full bg-soft-grey flex items-center justify-center">
                        <UserRound size={20} className="text-electric-blue" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-charcoal">
                          {user.user_metadata?.full_name || "My Account"}
                        </p>
                        <p className="text-xs text-muted-grey truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left pl-13 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="btn primary-btn w-full text-center"
                  >
                    Sign In
                  </Link>
                ))}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
