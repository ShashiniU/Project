"use client"

import { useState , useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Dashboard.css"
import { authService } from "../services/api"
import "./ListingsPage.css"



// Mock data for the dashboard
const mockPurchases = [
  {
    id: 1,
    name: "Natural Blue Sapphire",
    date: "2024-02-15",
    price: 4500,
    status: "Delivered",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Colombian Emerald",
    date: "2024-01-28",
    price: 5200,
    status: "In Transit",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const mockSavedItems = [
  {
    id: 1,
    name: "Tanzanite Gemstone",
    price: 3800,
    seller: "Premium Gems",
    date: "2024-02-12",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Pink Tourmaline",
    price: 2200,
    seller: "Exotic Stones",
    date: "2024-02-08",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const Dashboard = ({ isLoggedIn }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [myListings, setMyListings] = useState()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return; // Return early from the useEffect if not logged in
    }

    // Fetch listings only if logged in
    const fetchListings = async () => {
      try {
        const res = await authService.mylisting({ userid: savedUser.id });
        setMyListings(res.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings(); // Call the async function
  }, [isLoggedIn, savedUser?.id, navigate]); 
  
  


  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <Link to="/create-listing" className="get-started">
          Create New Listing
        </Link>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-image">
              <img src= "/placeholder.svg?height=100&width=100" alt="User Profile" />
            </div>
            <div className="profile-info">
              <h3>{savedUser.firstName+' '+savedUser.lastName}</h3>
              <p>Member since Jan 2024</p>
            </div>
          </div>

          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`nav-item ${activeTab === "purchases" ? "active" : ""}`}
              onClick={() => setActiveTab("purchases")}
            >
              Purchase History
            </button>
            <button
              className={`nav-item ${activeTab === "listings" ? "active" : ""}`}
              onClick={() => setActiveTab("listings")}
            >
              My Listings
            </button>
            <button
              className={`nav-item ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              Saved Items
            </button>
            <button
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Account Settings
            </button>
          </nav>
        </div>

        <div className="dashboard-main">
          {activeTab === "overview" && (
            <div className="dashboard-overview">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Purchases</h3>
                  <div className="stat-value">$9,700</div>
                  <p>2 items</p>
                </div>
                <div className="stat-card">
                  <h3>Active Listings</h3>
                  <div className="stat-value">1</div>
                  <p>$6,800 total value</p>
                </div>
                <div className="stat-card">
                  <h3>Total Sales</h3>
                  <div className="stat-value">$12,500</div>
                  <p>1 item sold</p>
                </div>
                <div className="stat-card">
                  <h3>Saved Items</h3>
                  <div className="stat-value">2</div>
                  <p>$6,000 total value</p>
                </div>
              </div>

              {/* <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  {mockPurchases.map((purchase) => (
                    <div key={purchase.id} className="activity-item">
                      <img src={`http://localhost:5000${purchase.primary_image}` || "/placeholder.svg"} alt={purchase.name} className="activity-image" />
                      <div className="activity-details">
                        <h3>{purchase.name}</h3>
                        <p>
                          Purchased on {new Date(purchase.date).toLocaleDateString()} - {purchase.status}
                        </p>
                      </div>
                      <div className="activity-price">${purchase.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          )}

          {activeTab === "purchases" && (
            <div className="purchases-section">
              <h2>Purchase History</h2>
              <div className="purchases-list">
                {mockPurchases.map((purchase) => (
                  <div key={purchase.id} className="purchase-item">
                    <img src={purchase.image || "/placeholder.svg"} alt={purchase.name} />
                    <div className="purchase-details">
                      <h3>{purchase.name}</h3>
                      <p>Purchased on {new Date(purchase.date).toLocaleDateString()}</p>
                      <div className={`status-badge ${purchase.status.toLowerCase()}`}>{purchase.status}</div>
                    </div>
                    <div className="purchase-price">${purchase.price.toLocaleString()}</div>
                    <button className="btn btn-secondary">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "listings" && (
            <div className="listings-section">
              <h2>My Listings</h2>
              <div className="listings-list">
                {myListings.map((listing) => (
                  <div key={listing.id} className="listing-item">
                    <img src={`http://localhost:5000${listing.primary_image}` || "/placeholder.svg"} alt={listing.name} />
                    <div className="listing-details">
                      <h3>{listing.name}</h3>
                      <p>Listed on {new Date(listing.date).toLocaleDateString()}</p>
                      <div className={`status-badge ${listing.status.toLowerCase()}`}>{listing.status}</div>
                    </div>
                    <div className="listing-stats">
                      <span>{listing.views} views</span>
                      <span>{listing.favorites} favorites</span>
                    </div>
                    <div className="listing-price">${listing.price.toLocaleString()}</div>
                    <div className="listing-actions">
                      <button className="btn btn-secondary">Edit</button>
                      <button className="btn btn-outline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="saved-section">
              <h2>Saved Items</h2>
              <div className="saved-list">
                {mockSavedItems.map((item) => (
                  <div key={item.id} className="saved-item">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    <div className="saved-details">
                      <h3>{item.name}</h3>
                      <p>Seller: {item.seller}</p>
                      <p>Saved on {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <div className="saved-price">${item.price.toLocaleString()}</div>
                    <div className="saved-actions">
                      <Link to={`/gemstone/${item.id}`} className="view-details">
                        View Details
                      </Link>
                      <button className="remove">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <form className="settings-form">
                <div className="form-section">
                  <h3>Profile Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" className="form-control" defaultValue={savedUser.firstName} />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" className="form-control" defaultValue={savedUser.lastName} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" defaultValue={savedUser.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" className="form-control" defaultValue="(555) 123-4567" />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Shipping Address</h3>
                  <div className="form-group">
                    <label>Street Address</label>
                    <input type="text" className="form-control" defaultValue="123 Main St" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" className="form-control" defaultValue="New York" />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input type="text" className="form-control" defaultValue="NY" />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input type="text" className="form-control" defaultValue="10001" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Payment Information</h3>
                  <div className="payment-cards">
                    <div className="payment-card">
                      <div className="card-info">
                        <span className="card-brand">Visa</span>
                        <span className="card-number">•••• •••• •••• 4242</span>
                      </div>
                      <button type="button" className="remove">
                        Remove
                      </button>
                    </div>
                  </div>
                  <button type="button" className="btn btn-secondary">
                    Add Payment Method
                  </button>
                </div>

                <div className="form-actions">
                  <button type="submit" className="get-started">
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-outline">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

