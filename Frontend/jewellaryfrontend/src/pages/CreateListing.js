"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateListing.css"

const CreateListing = ({ isLoggedIn }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    carat: "",
    color: "",
    clarity: "",
    cut: "",
    origin: "",
    treatment: "",
    certification: "",
    certificationNumber: "",
    price: "",
    description: "",
    images: [],
  })

  const [errors, setErrors] = useState({})

  if (!isLoggedIn) {
    navigate("/login")
    return null
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target

    if (type === "file") {
      const files = Array.from(e.target.files)
      setFormData({
        ...formData,
        [name]: [...formData.images, ...files],
      })

      // Show preview of the first image
      if (files.length > 0) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewImage(reader.result)
        }
        reader.readAsDataURL(files[0])
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
    if (index === 0) {
      setPreviewImage(null)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const requiredFields = [
      "name",
      "type",
      "carat",
      "color",
      "clarity",
      "cut",
      "origin",
      "certification",
      "certificationNumber",
      "price",
      "description",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required"
    }

    if (formData.carat && isNaN(Number.parseFloat(formData.carat))) {
      newErrors.carat = "Carat must be a number"
    }

    if (formData.price && isNaN(Number.parseFloat(formData.price))) {
      newErrors.price = "Price must be a number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        navigate("/dashboard")
      } catch (error) {
        console.error("Error creating listing:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="create-listing-page">
      <div className="create-listing-container">
        <div className="create-listing-header">
          <h1>Create New Listing</h1>
          <p>Fill in the details below to list your gemstone</p>
        </div>

        <form onSubmit={handleSubmit} className="create-listing-form">
          <div className="form-grid">
            <div className="form-section">
              <h2>Basic Information</h2>
              <div className="form-group">
                <label htmlFor="name">Gemstone Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                  placeholder="e.g., Natural Blue Sapphire"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={errors.type ? "error" : ""}
                  >
                    <option value="">Select Type</option>
                    <option value="Sapphire">Sapphire</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.type && <div className="error-message">{errors.type}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="carat">Carat Weight</label>
                  <input
                    type="number"
                    id="carat"
                    name="carat"
                    value={formData.carat}
                    onChange={handleChange}
                    className={errors.carat ? "error" : ""}
                    step="0.01"
                    placeholder="e.g., 2.5"
                  />
                  {errors.carat && <div className="error-message">{errors.carat}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className={errors.color ? "error" : ""}
                    placeholder="e.g., Deep Blue"
                  />
                  {errors.color && <div className="error-message">{errors.color}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="clarity">Clarity</label>
                  <input
                    type="text"
                    id="clarity"
                    name="clarity"
                    value={formData.clarity}
                    onChange={handleChange}
                    className={errors.clarity ? "error" : ""}
                    placeholder="e.g., VVS"
                  />
                  {errors.clarity && <div className="error-message">{errors.clarity}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cut">Cut</label>
                  <input
                    type="text"
                    id="cut"
                    name="cut"
                    value={formData.cut}
                    onChange={handleChange}
                    className={errors.cut ? "error" : ""}
                    placeholder="e.g., Oval"
                  />
                  {errors.cut && <div className="error-message">{errors.cut}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="origin">Origin</label>
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    className={errors.origin ? "error" : ""}
                    placeholder="e.g., Sri Lanka"
                  />
                  {errors.origin && <div className="error-message">{errors.origin}</div>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Certification & Treatment</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="certification">Certification</label>
                  <select
                    id="certification"
                    name="certification"
                    value={formData.certification}
                    onChange={handleChange}
                    className={errors.certification ? "error" : ""}
                  >
                    <option value="">Select Certification</option>
                    <option value="GIA">GIA</option>
                    <option value="IGI">IGI</option>
                    <option value="AGL">AGL</option>
                    <option value="GRS">GRS</option>
                  </select>
                  {errors.certification && <div className="error-message">{errors.certification}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="certificationNumber">Certificate Number</label>
                  <input
                    type="text"
                    id="certificationNumber"
                    name="certificationNumber"
                    value={formData.certificationNumber}
                    onChange={handleChange}
                    className={errors.certificationNumber ? "error" : ""}
                    placeholder="e.g., GIA2185960123"
                  />
                  {errors.certificationNumber && <div className="error-message">{errors.certificationNumber}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="treatment">Treatment (if any)</label>
                <select
                  id="treatment"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  className={errors.treatment ? "error" : ""}
                >
                  <option value="">Select Treatment</option>
                  <option value="None">None</option>
                  <option value="Heat">Heat Treatment</option>
                  <option value="Clarity">Clarity Enhancement</option>
                  <option value="Other">Other</option>
                </select>
                {errors.treatment && <div className="error-message">{errors.treatment}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (USD)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={errors.price ? "error" : ""}
                  placeholder="e.g., 5000"
                  step="0.01"
                />
                {errors.price && <div className="error-message">{errors.price}</div>}
              </div>
            </div>
          </div>

          <div className="form-section full-width">
            <h2>Description & Images</h2>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? "error" : ""}
                rows="4"
                placeholder="Provide a detailed description of your gemstone..."
              />
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label>Images</label>
              <div className="image-upload-container">
                <div className="image-preview">
                  {previewImage ? (
                    <img src={previewImage || "/placeholder.svg"} alt="Gemstone preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <span>Upload Images</span>
                      <p>Drag and drop or click to select</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="images"
                  onChange={handleChange}
                  multiple
                  accept="image/*"
                  className={errors.images ? "error" : ""}
                />
              </div>
              {errors.images && <div className="error-message">{errors.images}</div>}
              {formData.images.length > 0 && (
                <div className="image-list">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-item">
                      <span>{image.name}</span>
                      <button type="button" onClick={() => handleRemoveImage(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`}>
              {isLoading ? "Creating Listing..." : "Create Listing"}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateListing

