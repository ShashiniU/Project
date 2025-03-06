"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Checkout.css"

// Mock data for the selected gemstone
// const gemstoneData = {
//   6: {
//     id: 1,
//     name: "Natural Blue Sapphire",
//     price: 4500,
//     image: "/placeholder.svg?height=100&width=100",
//     certification: "GIA Certified",
//   },
// }

const Checkout = ({ isLoggedIn }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const gemstoneData = JSON.parse(localStorage.getItem("Items")) || {}
  const gemstone = gemstoneData.find(gem => gem.id === Number(id)) || {}

  const [formData, setFormData] = useState( JSON.parse(localStorage.getItem("user")))

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  if (!isLoggedIn) {
    navigate("/login")
    return null
  }

  if (!gemstone) {
    return (
      <div className="not-found">
        <h2>Gemstone Not Found</h2>
        <p>The gemstone you're trying to purchase doesn't exist.</p>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields validation
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "country"]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number"
    }

    // Payment validation
    if (formData.paymentMethod === "credit") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required"
      }
      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required"
      }
      if (!formData.cvv) {
        newErrors.cvv = "CVV is required"
      }
    }

    // Terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        navigate("/dashboard")
      } catch (error) {
        console.error("Checkout error:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Secure Checkout</h1>
          <p>Complete your purchase securely</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Contact Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`form-control ${errors.firstName ? "error" : ""}`}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`form-control ${errors.lastName ? "error" : ""}`}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? "error" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-control ${errors.phone ? "error" : ""}`}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={`form-control ${errors.address ? "error" : ""}`}
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className={`form-control ${errors.city ? "error" : ""}`}
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && <div className="error-message">{errors.city}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className={`form-control ${errors.state ? "error" : ""}`}
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {errors.state && <div className="error-message">{errors.state}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      className={`form-control ${errors.zipCode ? "error" : ""}`}
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === "credit"}
                      onChange={handleChange}
                    />
                    <label htmlFor="credit">Credit Card</label>
                  </div>
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                </div>

                {formData.paymentMethod === "credit" && (
                  <div className="credit-card-fields">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        className={`form-control ${errors.cardNumber ? "error" : ""}`}
                        value={formData.cardNumber}
                        onChange={handleChange}
                      />
                      {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          className={`form-control ${errors.expiryDate ? "error" : ""}`}
                          value={formData.expiryDate}
                          onChange={handleChange}
                        />
                        {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          className={`form-control ${errors.cvv ? "error" : ""}`}
                          value={formData.cvv}
                          onChange={handleChange}
                        />
                        {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section terms-section">
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <label htmlFor="agreeTerms">I agree to the terms of service and privacy policy</label>
                </div>
                {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
              </div>

              <button type="submit" className={`get-started btn-block ${isLoading ? "loading" : ""}`}>
                {isLoading ? "Processing..." : "Complete Purchase"}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="gemstone-summary">
                <img src={`http://localhost:5000${gemstone.primary_image}`} alt={gemstone.name} className="gemstone-thumbnail" />
                <div className="gemstone-info">
                  <h3>{gemstone.name}</h3>
                  <p className="certification">{gemstone.certification}</p>
                </div>
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${gemstone.price.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row">
                  <span>Insurance</span>
                  <span>Included</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${gemstone.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="security-info">
                <div className="security-badge">
                  <span className="icon">🔒</span>
                  <div className="badge-text">
                    <h4>Secure Transaction</h4>
                    <p>Your data is protected with 256-bit encryption</p>
                  </div>
                </div>
                <div className="security-badge">
                  <span className="icon">✓</span>
                  <div className="badge-text">
                    <h4>Buyer Protection</h4>
                    <p>Full refund if item is not as described</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

