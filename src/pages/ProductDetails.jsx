import { useParams, Link } from "react-router-dom";
import { productData } from "../data/products";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Star, ChevronRight } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
import QuantitySelector from "../components/QuantitySelector";

  const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = productData.find((item) => item.id === Number(id));

  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <section className="text-center py-20">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link to="/shop" className="btn primary-btn mt-6 inline-block">
          Back to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pb-12 pt-8">
      {/* BREADCRUMB */}
<div className="flex items-center gap-2 text-sm text-muted-grey mb-8">
  <Link to="/" className="hover:text-electric-blue">
    Home
  </Link>
  <ChevronRight size={16} />
  <Link to="/shop" className="hover:text-electric-blue">
    Shop
  </Link>
  <ChevronRight size={16} />
  <span className="text-charcoal">{product.name}</span>
</div>

{/* PRODUCT DETAILS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

  {/* PRODUCT IMAGE */}
  <div className="bg-soft-grey rounded-2xl overflow-hidden">
    <img
      src={product.imgUrl}
      alt={product.name}
      className="w-full h-[350px] md:h-[450px] object-contain"
    />
  </div>

  {/* PRODUCT INFORMATION */}
  <div className="flex flex-col">

    <p className="text-sm text-electric-blue font-medium">
      {product.category}
    </p>

    <h1 className="text-2xl md:text-3xl font-bold text-charcoal mt-2">
      {product.name}
    </h1>

    {/* RATING */}
    <div className="flex items-center gap-2 mt-4">
      <div className="flex items-center text-yellow-500">
        <Star size={18} fill="currentColor" />
        <span className="ml-1 text-charcoal font-medium">
          {product.rating}
        </span>
      </div>

      <span className="text-sm text-muted-grey">
        ({product.reviews} reviews)
      </span>
    </div>

    {/* PRICE */}
    <div className="flex items-center gap-3 mt-6">
      <p className="text-2xl font-bold text-charcoal">
        ₦{product.price.toLocaleString("en-NG")}
      </p>

      {product.oldPrice && (
        <p className="text-muted-grey line-through">
          ₦{product.oldPrice.toLocaleString("en-NG")}
        </p>
      )}
    </div>

    {/* DESCRIPTION */}
    <p className="text-muted-grey leading-relaxed mt-6">
      Experience quality and convenience with the {product.name}.
      Designed to combine functionality, style and everyday comfort.
    </p>

    {/* QUANTITY SELECTOR */}
<div className="mt-8">
  <p className="text-sm font-medium text-charcoal mb-3">
    Quantity
  </p>

  <QuantitySelector
    quantity={quantity}
    onIncrease={() => setQuantity((prev) => prev + 1)}
    onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
  />
</div>

    {/* ADD TO CART */}
    <button
      type="button"
      onClick={() => addToCart(product, quantity)}
      className="btn primary-btn flex items-center justify-center gap-2 mt-8"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>

  </div>
</div>

<RelatedProducts product={product} />
    </section>
  );
};



export default ProductDetails