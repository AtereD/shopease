// import { productData } from "../data/products";
import { Heart, Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-border flex flex-col h-full">
      <div className="relative lg:overflow-hidden lg:h-60 h-45">
        <img
          src={product.imgUrl}
          alt={product.name}
          className=" h-full w-full object-cover"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-sm text-electric-blue font-bold">
            {product.badge}
          </div>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 rounded-full bg-white p-2 text-red-600 shadow-sm transition-all duration-200 hover:scale-110"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
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
            <h4 className="font-bold text-lg line-clamp-2">{product.name}</h4>

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
        <button className="btn primary-btn flex items-center justify-center gap-2 mt-auto">
          Add to Cart <ShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
