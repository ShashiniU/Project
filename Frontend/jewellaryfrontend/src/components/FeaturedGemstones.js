import { Link } from "react-router-dom"
import "./FeaturedGemstones.css"
import "../pages/ListingsPage.css"


// Mock data for featured gemstones
const featuredGems = [
  {
    id: 1,
    name: "Natural Blue Sapphire",
    description: "Stunning 3.5 carat natural blue sapphire with excellent clarity and color.",
    price: 4500,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GIA Certified",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Colombian Emerald",
    description: "Rare 2.7 carat Colombian emerald with vivid green color and minimal inclusions.",
    price: 5200,
    image: "/placeholder.svg?height=300&width=300",
    certification: "AGL Certified",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Ruby from Burma",
    description: "Exquisite 2.1 carat Burmese ruby with pigeon blood color and excellent cut.",
    price: 6800,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GRS Certified",
    rating: 5.0,
  },
  {
    id: 4,
    name: "Yellow Diamond",
    description: "Brilliant 1.8 carat fancy yellow diamond with VS1 clarity and excellent cut.",
    price: 12500,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GIA Certified",
    rating: 4.9,
  },
]

const FeaturedGemstones = () => {
  const handleBuyNowClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault(); // Prevent navigation
      alert("You need to log in to proceed with the purchase.");
    }
  };
  return (
    <div className="featured-gemstones">
      <div className="gemstone-grid">
        {featuredGems.map((gem) => (
          <div className="gemstone-card" key={gem.id}>
            <div className="gemstone-badge">{gem.certification}</div>
            <img src={gem.image || "/placeholder.svg"} alt={gem.name} className="gemstone-img" />
            <div className="gemstone-content">
              <h3 className="gemstone-name">{gem.name}</h3>
              <p className="gemstone-description">{gem.description}</p>
              <div className="gemstone-details">
                <span className="gemstone-price">${gem.price.toLocaleString()}</span>
                <span className="gemstone-rating">★ {gem.rating}</span>
              </div>
              <div className="gemstone-actions">
                <Link to={`/gemstone/${gem.id}`} className="view-details">
                  View Details
                </Link>
                <Link 
      to={`/checkout/${gem.id}`} 
      className="buy-now" 
      onClick={handleBuyNowClick}
    >
      Buy Now
    </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedGemstones

