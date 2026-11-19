import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 pl-5 md:pl-8 items-center hero lg:h-screen md:items-start  ">
      {/* LEFT CONTENT */}
      <div className="flex flex-col gap-6 lg:pt-26 justify-center w-full md:pl-2 pr-2 lg:pr-0 lg:py-40 md:h-auto py-16 min-h-screen">
        <h1 className="lg:text-6xl sm:text-5xl font-extrabold leading-tight mt-0 text-4xl">
          Discover, <br /> <span className="text-electric-blue">ShopEase,</span>{" "}
          <br /> Enjoy.
        </h1>
        <p className="md:text-muted-grey max-w-70 lg:max-w-120 md:text-[18px]">
          Thousands of products, from hundreds of trusted brands. Free shipping,
          easy returns and deals you won't find anywhere.
        </p>
        <div className="flex gap-3 items-center flex-wrap">
          <Link to="/shop" className="btn primary-btn gap-2">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#categories" className="btn secondary-btn">
            Explore Categories
          </a>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="lg:pb-10 w-full hidden md:block">
        <img
          src="/images/hero-img.webp"
          alt="A collection of carefully selected lifestyle products"
          className="object-cover h-full w-full md:h-150 lg:h-187.5 "
        />
      </div>
    </section>
  );
};

export default Hero;
