import React from "react";

const NewsLetter = () => {
  return (
    <section className="px-5 md:px-8 py-16 bg-electric-blue text-white flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-gray-300 mb-4">
          Stay in the loop
        </p>
        <h2 className="md:text-3xl font-bold font-heading sm:text-2xl text-lg mb-4">
          Get deals before they sell out.
        </h2>

        <p className="text-gray-300 text-xs leading-4.5 max-w-100 md:max-w-120">
          New arrivals, flash sales and style guides straight to your{" "}
          <br className="hidden md:block" /> inbox. No spam, ever.
        </p>
      </div>
      <div className="flex sm:flex-row flex-col gap-2 mt-10 w-full items-center justify-center">
        <input
          type="email"
          placeholder="Enter your email address"
          className="border border-gray-300/40 rounded-lg p-2.5 bg-[#d1d6da]/20 placeholder:text-sm"
        />
        <button className="btn bg-white text-electric-blue">Subscribe</button>
      </div>
    </section>
  );
};

export default NewsLetter;
