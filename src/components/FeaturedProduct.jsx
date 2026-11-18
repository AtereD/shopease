import { Link } from "react-router-dom";
import { productData } from "../data/products";
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-electric-blue">
          Handpicked for you
        </p>
        <h2 className="md:text-3xl font-bold font-heading text-2xl">
          Featured Products
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {productData.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <Link to="/shop" className="btn text-electric-blue">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProduct;