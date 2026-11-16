import AnnouncementBar from "../components/AnnouncementBar"
import CategorySection from "../components/CategorySection"
import FeaturedProduct from "../components/FeaturedProduct"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"


const Home = () => {
  return (
    <div>
        <AnnouncementBar/>
        <Navbar/>
        <Hero/>
        <CategorySection/>
        <FeaturedProduct/>
    </div>
  )
}

export default Home