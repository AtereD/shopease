import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categories } from "../data/categories";
import { productData } from "../data/products";
import ProductCard from "../components/ProductCard";
import { ChevronRight } from "lucide-react";

const CategoryShop = () => {
  const [sortOption, setSortOption] = useState("default");

  const { slug } = useParams();

  const category = categories.find((item) => item.slug === slug);

  // Handle invalid category
  if (!category) {
    return (
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-charcoal">
          Category Not Found
        </h1>

        <p className="text-muted-grey mt-2">
          Sorry, this category doesn't exist.
        </p>

        <Link to="/categories" className="btn primary-btn mt-6 inline-block">
          Browse Categories
        </Link>
      </section>
    );
  }

  // Filter products by category
  const filteredProducts = productData.filter(
    (product) => product.category === category.name
  );

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price;
    }

    if (sortOption === "high-to-low") {
      return b.price - a.price;
    }

    if (sortOption === "highest-rated") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pb-12 pt-8">
          {/* BREADCRUMB */}
<div className="flex items-center gap-2 text-sm text-muted-grey mb-8">
  <Link to="/" className="hover:text-electric-blue">
    Home
  </Link>
  <ChevronRight size={16} />
  <Link to="/shop" className="hover:text-electric-blue">
    Categories
  </Link>
  <ChevronRight size={16} />
  <span className="text-charcoal">{category.name}</span>
</div>
      {/* CATEGORY HEADER */}
      <h1 className="text-3xl font-bold font-heading text-charcoal">
        {category.name}
      </h1>

      <p className="text-muted-grey mt-2 text-sm">
        {category.description}
      </p>

      {/* PRODUCTS SECTION */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-charcoal">
              {category.name} Products
            </h2>

            <p className="text-sm text-muted-grey">
              {filteredProducts.length} Products
            </p>
          </div>

          {/* SORTING */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm outline-none"
          >
            <option value="default">Default Sorting</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="highest-rated">Highest Rated</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-grey py-12">
              No products available in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryShop;