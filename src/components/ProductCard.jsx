import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Heart, Star, ShoppingCart, Trash } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const { wishListItems, toggleWishlist } = useContext(WishlistContext);
  const isWishlisted = wishListItems.some((item) => item.id === product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);
  return (
    <div className="rounded-2xl overflow-hidden border border-border flex flex-col h-full">
      <div className="relative lg:overflow-hidden lg:h-60 h-45">
        <Link
          to={`/product/${product.id}`}
          className="block h-full overflow-hidden"
        >
          <img
            src={product.imgUrl}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-sm text-electric-blue font-bold">
            {product.badge}
          </div>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-red-500"
            }
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="md:p-4 p-2 flex flex-col flex-1">
        <div className="mb-4">
          {/* RATING */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={
                    index < Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400 w-3"
                      : "text-gray-300 w-3"
                  }
                />
              ))}
            </div>

            <span className="text-xs text-muted-grey">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-lg line-clamp-2 hover:text-electric-blue transition-colors">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h4>

            <div className="flex items-center gap-2">
              <p className="text-[15px]">
                &#8358;{product.price.toLocaleString("en-NG")}
              </p>

              {product.oldPrice && (
                <p className="text-sm text-muted-grey line-through">
                  &#8358;{product.oldPrice.toLocaleString("en-NG")}
                </p>
              )}
            </div>
          </div>
        </div>
        {cartItem ? (
          <div className="flex items-center justify-between gap-1 mt-auto ">
            <QuantitySelector
              quantity={cartItem.quantity}
              onIncrease={() => updateQuantity(product.id, 1)}
              onDecrease={() => updateQuantity(product.id, -1)}
            />

            <button
              type="button"
              onClick={() => removeFromCart(product.id)}
              aria-label={`Remove ${product.name} from cart`}
              className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
            >
              <Trash size={18} />
            </button>
          </div>
        ) : (
          <button
            className="btn primary-btn flex items-center justify-center gap-2 mt-auto"
            onClick={() => addToCart(product)}
            type="button"
          >
            Add to Cart <ShoppingCart />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
