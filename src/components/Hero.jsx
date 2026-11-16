import { ArrowRight } from "lucide-react"
// import {heroImg}  from "../assets/hero-img.png"

const Hero = () => {
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 pl-5 md:pl-8 lg:pb-16 items-center  hero max-w-7xl md:h-screen md:items-start md:pb-12">
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 pt-26  justify-center w-full md:pl-2">
            {/* <p>Discover the difference</p> */}
             <h1 className="lg:text-6xl text-5xl font-extrabold leading-tight mt-0">Discover, <br/> <span className="text-electric-blue">ShopEase,</span> <br/> Enjoy.</h1>
             <p className="text-muted-grey max-w-100 lg:max-w-120">Thousands of products, from hundereds of trusted brands. Free shipping, easy returns and deals you won't find anywhere.</p>
             <div className="flex gap-4 items-center flex-wrap">
              <button className="btn primary-btn gap-2">Shop Now <ArrowRight className="w-5 h-5"/></button>
              <button className="btn secondary-btn">Explore Categories</button>
             </div>
        </div>

        {/* RIGHT CONTENT */}
      <div className="lg:pb-10">
          <img src="/images/hero-img.png" alt="A collection of carefully selected lifestyle products" className="object-cover h-full w-full "/>
        </div>
    </section>
  )
}

export default Hero