import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishListItems } = useContext(WishlistContext);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pb-12 pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal">My Wishlist</h1>
        <p className="text-muted-grey mt-2">
          Your favourite products, all in one place.
        </p>
      </div>

      {wishListItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishListItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          {/* <Heart size={48} className="text-muted-grey mb-4" /> */}

          <h2 className="text-xl font-semibold text-charcoal">
            Your wishlist is empty
          </h2>

          <p className="text-muted-grey mt-2 mb-6">
            Save products you love by clicking the heart icon.
          </p>

          <Link to="/shop" className="btn primary-btn">
            Continue Shopping
          </Link>
        </div>
      )}
    </section>
  );
};

export default Wishlist;