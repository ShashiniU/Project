"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { FaHeart , FaSlideshare, FaUserShield, FaAward, FaCheck } from "react-icons/fa"
import "./GemstoneDetail.css"

// Mock data for gemstone details
const gemstoneData = {
  1: {
    id: 1,
    name: "Natural Blue Sapphire",
    description:
      "Stunning 3.5 carat natural blue sapphire with excellent clarity and color. This exceptional gemstone features a vivid blue hue that is characteristic of the finest sapphires from Sri Lanka. The stone has been expertly cut to maximize its brilliance and color saturation.",
    price: 4500,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    certification: "GIA Certified",
    rating: 4.9,
    type: "Sapphire",
    carat: 3.5,
    origin: "Sri Lanka",
    cut: "Oval",
    dimensions: "10mm x 8mm x 5mm",
    color: "Vivid Blue",
    clarity: "Eye Clean",
    treatment: "Heat Treated",
    seller: {
      name: "Premium Gems",
      rating: 4.8,
      sales: 156,
      joined: "Jan 2019",
    },
    reviews: [
      {
        user: "GemCollector",
        rating: 5,
        date: "2023-05-15",
        comment:
          "Absolutely stunning sapphire! The color is even more vibrant in person. Very satisfied with this purchase.",
      },
      {
        user: "JewelryDesigner22",
        rating: 5,
        date: "2023-04-28",
        comment:
          "Perfect stone for a custom engagement ring I was designing. The cut is excellent and the color is magnificent.",
      },
      {
        user: "StoneLover",
        rating: 4,
        date: "2023-03-10",
        comment: "Beautiful sapphire with great color. Shipping was fast and the certification was as described.",
      },
    ],
  },
  // Additional gemstones would be defined here
}

const GemstoneDetail = () => {
  const { id } = useParams()
  const gemstone = gemstoneData[id]

  const [mainImage, setMainImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!gemstone) {
    return (
      <div className="not-found">
        <h2>Gemstone Not Found</h2>
        <p>The gemstone you're looking for doesn't exist or has been removed.</p>
        <Link to="/listings" className="btn btn-primary">
          Back to Listings
        </Link>
      </div>
    )
  }

  return (
    <div className="gemstone-detail">
      <div className="detail-container">
        <div className="detail-images">
          <div className="main-image">
            <img src={gemstone.images[mainImage] || "/placeholder.svg"} alt={gemstone.name} />
            <div className="certification-badge">{gemstone.certification}</div>
          </div>
          <div className="thumbnail-images">
            {gemstone.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${mainImage === index ? "active" : ""}`}
                onClick={() => setMainImage(index)}
              >
                <img src={image || "/placeholder.svg"} alt={`${gemstone.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <h1 className="gemstone-title">{gemstone.name}</h1>

          <div className="gemstone-meta">
            <div className="rating">★ {gemstone.rating}</div>
            <div className="separator">|</div>
            <div className="reviews-count">{gemstone.reviews.length} Reviews</div>
            <div className="separator">|</div>
            <div className="seller">Sold by: {gemstone.seller.name}</div>
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
              <span className="spec-label">Dimensions:</span>
              <span className="spec-value">{gemstone.dimensions}</span>
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
              <Link to={`/checkout/${gemstone.id}`} className="btn btn-primary btn-lg">
                Buy Now
              </Link>
              <button className="btn btn-secondary btn-lg">Add to Cart</button>
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

      <div className="detail-tabs">
        <div className="tabs-container">
          <div className="tabs-header">
            <button className="tab-btn active">Description</button>
            <button className="tab-btn">Specifications</button>
            <button className="tab-btn">Reviews ({gemstone.reviews.length})</button>
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

      <div className="related-gemstones">
        <h2>You May Also Like</h2>
        <div className="related-grid">
          {/* Related gemstones would be mapped here */}
          <div className="related-placeholder">
            <p>Related gemstones would appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GemstoneDetail

