"use client"

import { useState } from "react"
import { useParams, Link  } from "react-router-dom"
import { FaHeart , FaSlideshare, FaUserShield, FaAward, FaCheck } from "react-icons/fa"
import "./GemstoneDetail.css"
import "./ListingsPage.css"


// // Mock data for gemstone details
// const gemstoneData = {
//   1: {
//     id: 1,
//     name: "Natural Blue Sapphire",
//     description:
//       "Stunning 3.5 carat natural blue sapphire with excellent clarity and color. This exceptional gemstone features a vivid blue hue that is characteristic of the finest sapphires from Sri Lanka. The stone has been expertly cut to maximize its brilliance and color saturation.",
//     price: 4500,
//     images: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     certification: "GIA Certified",
//     rating: 4.9,
//     type: "Sapphire",
//     carat: 3.5,
//     origin: "Sri Lanka",
//     cut: "Oval",
//     dimensions: "10mm x 8mm x 5mm",
//     color: "Vivid Blue",
//     clarity: "Eye Clean",
//     treatment: "Heat Treated",
//     seller: {
//       name: "Premium Gems",
//       rating: 4.8,
//       sales: 156,
//       joined: "Jan 2019",
//     },
//     reviews: [
//       {
//         user: "GemCollector",
//         rating: 5,
//         date: "2023-05-15",
//         comment:
//           "Absolutely stunning sapphire! The color is even more vibrant in person. Very satisfied with this purchase.",
//       },
//       {
//         user: "JewelryDesigner22",
//         rating: 5,
//         date: "2023-04-28",
//         comment:
//           "Perfect stone for a custom engagement ring I was designing. The cut is excellent and the color is magnificent.",
//       },
//       {
//         user: "StoneLover",
//         rating: 4,
//         date: "2023-03-10",
//         comment: "Beautiful sapphire with great color. Shipping was fast and the certification was as described.",
//       },
//     ],
//   },
//   // Additional gemstones would be defined here
// }

const GemstoneDetail = ({isLoggedIn }) => {
  // const navigate = useNavigate();
  const { id } = useParams()
  const gemstoneData = JSON.parse(localStorage.getItem("Items")) || {}
  const gemstone = gemstoneData.find(gem => gem.id === Number(id)) || {}


  const [quantity, setQuantity] = useState(1)

  if (!gemstone) {
    return (
      <div className="not-found">
        <h2>Gemstone Not Found</h2>
        <p>The gemstone you're looking for doesn't exist or has been removed.</p>
        <Link to="/listings" className="get-started">
          Back to Listings
        </Link>
      </div>
    )
  }
  const handleBuyNowClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault(); // Prevent navigation
      alert("You need to log in to proceed with the purchase.");
    }
  };

  return (
    <div className="gemstone-detail">
      <div className="detail-container">
        <div className="detail-images">
          <div className="main-image">
            <img src={`http://localhost:5000${gemstone.primary_image}` || "/placeholder.svg"} alt={gemstone.name} />
            <div className="certification-badge">{gemstone.certification}</div>
          </div>
          <div className="thumbnail-images">
          <img src={`http://localhost:5000${gemstone.primary_image}` || "/placeholder.svg"} alt={`${gemstone.name}`} />
            {/* {gemstone.primary_image.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${gemstone.primary_image === index ? "active" : ""}`}
                onClick={() => setMainImage(index)}
              >
               
              </div>
              
            ))} */}
          </div>
        </div>

        <div className="detail-info">
          <h1 className="gemstone-title">{gemstone.name}</h1>

          <div className="gemstone-meta">
            {/* <div className="rating">★ {gemstone.rating}</div> */}
            <div className="separator">|</div>
            {/* <div className="reviews-count">{gemstone.reviews.length} Reviews</div> */}
            <div className="separator">|</div>
            {/* <div className="seller">Sold by: {gemstone.seller.name}</div> */}
          </div>

          <div className="gemstone-price">${gemstone.price.toLocaleString()}</div>

          <div className="gemstone-description">
            <p>{gemstone.description}</p>
          </div>

          <div className="gemstone-specs">
            <div className="spec-item">
              <span className="spec-label">Type:</span>
              <span className="spec-value">{gemstone.type}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Carat Weight:</span>
              <span className="spec-value">{gemstone.carat} ct</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Origin:</span>
              <span className="spec-value">{gemstone.origin}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Cut:</span>
              <span className="spec-value">{gemstone.cut}</span>
            </div>
            
            <div className="spec-item">
              <span className="spec-label">Color:</span>
              <span className="spec-value">{gemstone.color}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Clarity:</span>
              <span className="spec-value">{gemstone.clarity}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Treatment:</span>
              <span className="spec-value">{gemstone.treatment}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Certificate Number:</span>
              <span className="spec-value">{gemstone.certification_number}</span>
            </div>
          </div>

          <div className="purchase-options">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
            <Link 
      to={`/checkout/${gemstone.id}`} 
      className="buy-now" 
      onClick={handleBuyNowClick}
    >
      Buy Now
    </Link>
              <button className="view-details btn-lg">Add to Cart</button>
              <button className="btn btn-outline btn-icon">
                <FaHeart  />
              </button>
              <button className="btn btn-outline btn-icon">
                <FaSlideshare />
              </button>
            </div>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <FaUserShield className="badge-icon" />
              <div className="badge-text">
                <h4>Authenticity Guaranteed</h4>
                <p>Verified by third-party experts</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaAward className="badge-icon" />
              <div className="badge-text">
                <h4>Certified Quality</h4>
                <p>{gemstone.certification}</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaCheck className="badge-icon" />
              <div className="badge-text">
                <h4>Secure Payment</h4>
                <p>Multiple payment options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="verify-gemstone">
      <a 
      href="http://gemlab-certificate.ngja.gov.lk/" 
      target="_blank" 
      rel="noopener noreferrer"
      >
      <button className="verify-btn">Verify Gemstone</button>
      </a>
      </div>



      <div className="detail-tabs">
        <div className="tabs-container">
          <div className="tabs-header">
            <button className="tab-btn active">Description</button>
            <button className="tab-btn">Specifications</button>
            {/* <button className="tab-btn">Reviews ({gemstone.reviews.length})</button> */}
            <button className="tab-btn">Seller Info</button>
          </div>

          <div className="tab-content">
            <div className="tab-pane active">
              <h3>About this {gemstone.type}</h3>
              <p>{gemstone.description}</p>
              <p>
                This {gemstone.type} comes with full certification from {gemstone.certification}, guaranteeing its
                authenticity and quality. The gemstone has been expertly cut to maximize its natural beauty and
                brilliance.
              </p>
              <p>
                Origin: {gemstone.origin} - known for producing some of the world's finest {gemstone.type.toLowerCase()}
                s with exceptional color and clarity.
              </p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  )
}

export default GemstoneDetail

