import {  NavLink } from "react-router-dom"
import { categoryData } from "../data/category"

const CategorySection = () => {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        {/* Heading */}
        <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-electric-blue">Explore our collection</p>
            <div>
                <h2 className="md:text-3xl text-2xl font-bold font-heading">Shop by Category</h2>
            </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {categoryData.map((category)=>{
                return (
                    <NavLink to={`/category/${category.slug}`} key={category.id} className={`rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-electric-blue
                        ${
                        category.name === "Electronics" ? "md:col-span-2" : ""
                        }
                    `}>
                        <img src={category.imgUrl} className="w-full h-30 md:h-50 xl:h-68 object-cover transition-transform duration-300 group-hover:scale-105" alt={category.name}/>
                        <div className="p-5 text-center text-sm">
                            <h3 className="text-xl font-semibold">{category.name}</h3>
                            <p>{category.description}</p>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    </section>
  )
}

export default CategorySection