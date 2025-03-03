"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./ListingsPage.css"

// Mock data for gemstone listings
const gemstoneListings = [
  {
    id: 1,
    name: "Natural Blue Sapphire",
    description: "Stunning 3.5 carat natural blue sapphire with excellent clarity and color.",
    price: 4500,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GIA Certified",
    rating: 4.9,
    type: "Sapphire",
    carat: 3.5,
    origin: "Sri Lanka",
  },
  {
    id: 2,
    name: "Colombian Emerald",
    description: "Rare 2.7 carat Colombian emerald with vivid green color and minimal inclusions.",
    price: 5200,
    image: "/placeholder.svg?height=300&width=300",
    certification: "AGL Certified",
    rating: 4.8,
    type: "Emerald",
    carat: 2.7,
    origin: "Colombia",
  },
  {
    id: 3,
    name: "Ruby from Burma",
    description: "Exquisite 2.1 carat Burmese ruby with pigeon blood color and excellent cut.",
    price: 6800,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GRS Certified",
    rating: 5.0,
    type: "Ruby",
    carat: 2.1,
    origin: "Burma",
  },
  {
    id: 4,
    name: "Yellow Diamond",
    description: "Brilliant 1.8 carat fancy yellow diamond with VS1 clarity and excellent cut.",
    price: 12500,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GIA Certified",
    rating: 4.9,
    type: "Diamond",
    carat: 1.8,
    origin: "South Africa",
  },
  {
    id: 5,
    name: "Tanzanite Gemstone",
    description: "Beautiful 4.2 carat tanzanite with deep blue-violet color and excellent clarity.",
    price: 3800,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GIA Certified",
    rating: 4.7,
    type: "Tanzanite",
    carat: 4.2,
    origin: "Tanzania",
  },
  {
    id: 6,
    name: "Pink Tourmaline",
    description: "Vibrant 3.8 carat pink tourmaline with excellent transparency and cut.",
    price: 2200,
    image: "/placeholder.svg?height=300&width=300",
    certification: "IGI Certified",
    rating: 4.6,
    type: "Tourmaline",
    carat: 3.8,
    origin: "Brazil",
  },
  {
    id: 7,
    name: "Alexandrite Color Change",
    description: "Rare 1.5 carat alexandrite with dramatic color change from green to purple.",
    price: 15000,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GIA Certified",
    rating: 5.0,
    type: "Alexandrite",
    carat: 1.5,
    origin: "Russia",
  },
  {
    id: 8,
    name: "Paraiba Tourmaline",
    description: "Exceptional 1.2 carat Paraiba tourmaline with electric neon blue color.",
    price: 18000,
    image: "/placeholder.svg?height=300&width=300",
    certification: "GIA Certified",
    rating: 4.9,
    type: "Tourmaline",
    carat: 1.2,
    origin: "Brazil",
  },
]

const ListingsPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    priceMin: "",
    priceMax: "",
    caratMin: "",
    caratMax: "",
    origin: "",
    certification: "",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  // Get unique values for filter dropdowns
  const gemTypes = [...new Set(gemstoneListings.map((gem) => gem.type))]
  const origins = [...new Set(gemstoneListings.map((gem) => gem.origin))]
  const certifications = [...new Set(gemstoneListings.map((gem) => gem.certification))]

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  // Filter gemstones based on filters and search
  const filteredGemstones = gemstoneListings.filter((gem) => {
    // Filter by type
    if (filters.type && gem.type !== filters.type) return false

    // Filter by price range
    if (filters.priceMin && gem.price < Number.parseInt(filters.priceMin)) return false
    if (filters.priceMax && gem.price > Number.parseInt(filters.priceMax)) return false

    // Filter by carat range
    if (filters.caratMin && gem.carat < Number.parseFloat(filters.caratMin)) return false
    if (filters.caratMax && gem.carat > Number.parseFloat(filters.caratMax)) return false

    // Filter by origin
    if (filters.origin && gem.origin !== filters.origin) return false

    // Filter by certification
    if (filters.certification && gem.certification !== filters.certification) return false

    // Filter by search term
    if (
      searchTerm &&
      !gem.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !gem.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Sort gemstones
  const sortedGemstones = [...filteredGemstones].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "carat":
        return b.carat - a.carat
      default:
        return 0 // featured - no sorting
    }
  })

  return (
    <div className="listings-page">
      <div className="listings-header">
        <h1>Gemstone Listings</h1>
        <p>Discover our collection of authenticated gemstones from around the world</p>
      </div>

      <div className="listings-container">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search gemstones..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="filter-section">
            <h3>Gemstone Type</h3>
            <select name="type" value={filters.type} onChange={handleFilterChange} className="filter-select">
              <option value="">All Types</option>
              {gemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="range-input"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="range-input"
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Carat Range</h3>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min"
                name="caratMin"
                value={filters.caratMin}
                onChange={handleFilterChange}
                className="range-input"
                step="0.1"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                name="caratMax"
                value={filters.caratMax}
                onChange={handleFilterChange}
                className="range-input"
                step="0.1"
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Origin</h3>
            <select name="origin" value={filters.origin} onChange={handleFilterChange} className="filter-select">
              <option value="">All Origins</option>
              {origins.map((origin) => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Certification</h3>
            <select
              name="certification"
              value={filters.certification}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Certifications</option>
              {certifications.map((cert) => (
                <option key={cert} value={cert}>
                  {cert}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary reset-btn"
            onClick={() => {
              setFilters({
                type: "",
                priceMin: "",
                priceMax: "",
                caratMin: "",
                caratMax: "",
                origin: "",
                certification: "",
              })
              setSearchTerm("")
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="listings-content">
          <div className="listings-toolbar">
            <div className="results-count">{sortedGemstones.length} gemstones found</div>
            <div className="sort-options">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" value={sortBy} onChange={handleSortChange} className="sort-select">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="carat">Carat Weight</option>
              </select>
            </div>
          </div>

          <div className="gemstone-grid">
            {sortedGemstones.length > 0 ? (
              sortedGemstones.map((gem) => (
                <div className="gemstone-card" key={gem.id}>
                  <div className="gemstone-badge">{gem.certification}</div>
                  <img src={gem.image || "/placeholder.svg"} alt={gem.name} className="gemstone-img" />
                  <div className="gemstone-content">
                    <h3 className="gemstone-name">{gem.name}</h3>
                    <div className="gemstone-specs">
                      <span>{gem.carat} carats</span>
                      <span>•</span>
                      <span>{gem.origin}</span>
                    </div>
                    <p className="gemstone-description">{gem.description}</p>
                    <div className="gemstone-details">
                      <span className="gemstone-price">${gem.price.toLocaleString()}</span>
                      <span className="gemstone-rating">★ {gem.rating}</span>
                    </div>
                    <div className="gemstone-actions">
                      <Link to={`/gemstone/${gem.id}`} className="btn btn-primary gemstone-btn">
                        View Details
                      </Link>
                      <Link to={`/checkout/${gem.id}`} className="btn btn-secondary gemstone-btn">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No gemstones found</h3>
                <p>Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingsPage

