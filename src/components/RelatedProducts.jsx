import { productData } from "../data/products";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ product }) => {
  const relatedProducts = productData.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-electric-blue">
          You may also like
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-2">
          Related Products
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;