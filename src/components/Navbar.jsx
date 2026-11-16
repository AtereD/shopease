import { useState } from "react";
import { Heart, Search, ShoppingBag, HamburgerIcon } from "lucide-react";

const navLink = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/" },
  { name: "Categories", href: "/" },
  { name: "About", href: "/" },
];

const iconLink = [
  // { icon: <Search />, url: "/", label: "Search Products" },
  { icon: <Heart />, url: "/", label: "Wishlist" },
  { icon: <ShoppingBag />, url: "/", label: "Shopping cart" },
];

const Navbar = () => {
  const { isOpen, setIsOpen } = useState("false");

  return (
    <nav className="flex justify-between items-center md:px-8 py-4 border-b border-border px-5">
      {/* LOGO */}
      <div className="text-center ">
        <p className="text-lg font-bold text-charcoal">
          <span className="text-electric-blue">Shop</span>Ease
        </p>
      </div>

      {/* LINKS */}
      <div className="hidden lg:flex justify-center items-center gap-8">
        {navLink.map((nav) => {
          return (
            <a
              key={nav.name}
              className="transition-colors duration-200 hover:text-electric-blue font-medium text-charcoal"
              href={nav.href}
            >
              {nav.name}
            </a>
          );
        })}
      </div>

      {/* ICONS */}
      <div className="flex items-center gap-3 text-charcoal">
        <div className="flex items-center gap-2 border border-border rounded-lg md:px-3 py-3 px-2 w-36 sm:w-40 md:w-62.5 lg:w-75">
          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            className="outline-none w-full bg-transparent text-charcoal text-sm md:text-[15px]"
          />
        </div>
        {iconLink.map((icon) => {
          return (
            <a
              key={icon.label}
              href={icon.url}
              aria-label={icon.label}
              className={`transition-colors duration-200 hover:text-electric-blue text-charcoal w-5 h-5 md:w-6 md:h-6 flex items-center`}
            >
              {icon.icon}
            </a>
          );
        })}

        {/* Sign in */}
        <div>
          <button className="btn primary-btn">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
