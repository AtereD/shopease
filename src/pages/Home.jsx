
import CategorySection from "../components/CategorySection"
import FeaturedProduct from "../components/FeaturedProduct"
import Hero from "../components/Hero"
import NewsLetter from "../components/NewsLetter"

const Home = () => {
  return (
    <div>
        <Hero/>
        <CategorySection/>
        <FeaturedProduct/>
        <NewsLetter/>
    </div>
  )
}

export default Home