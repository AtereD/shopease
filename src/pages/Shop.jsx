import { useState } from "react";
import { productData } from "../data/products";
import ProductCard from "../components/ProductCard";

const categoryOptions = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Personal Care",
  "Accessories",
  "Sports & Outdoors",
];

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts =
  selectedCategory === "All"
    ? productData
    : productData.filter(
        (product) => product.category === selectedCategory
      );

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-12">

      {/* PAGE HEADING */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-electric-blue">
          Explore our collection
        </p>

        <h1 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mt-2">
          All Products
        </h1>

        <p className="text-muted-grey mt-3">
          Discover quality products across all your favourite categories.
        </p>
      </div>

      {/* CATEGORY FILTERS */}
<div className="flex gap-3 overflow-x-auto pb-3 mb-6">
  {categoryOptions.map((category) => (
    <button
      key={category}
      type="button"
      onClick={() => setSelectedCategory(category)}
      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
        selectedCategory === category
          ? "bg-electric-blue text-white"
          : "bg-soft-grey text-charcoal hover:bg-electric-blue hover:text-white"
      }`}
    >
      {category}
    </button>
  ))}
</div>

      {/* PRODUCT COUNT */}
      <div className="mb-6">
        <p className="text-sm text-muted-grey">
  Showing {filteredProducts.length} products
</p>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
      </div>

    </section>
  );
};

export default Shop;