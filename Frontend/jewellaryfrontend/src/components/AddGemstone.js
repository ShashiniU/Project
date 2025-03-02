import {React, useState } from 'react';

function AddGemstone({ addGemstone, setShowAddForm }) {
  const [newGem, setNewGem] = useState({
    name: "",
    type: "",
    carat: "",
    color: "",
    price: "",
    description: "",
    verified: false,
    image: "https://via.placeholder.com/300/CCCCCC/000000?text=New+Gemstone",
    certification: "",
    origin: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGem({
      ...newGem,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert string values to appropriate types
    const formattedGem = {
      ...newGem,
      carat: parseFloat(newGem.carat),
      price: parseInt(newGem.price)
    };
    addGemstone(formattedGem);
  };

  return (
    <div className="add-gemstone">
      <h2>List Your Gemstone</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gemstone Name</label>
          <input
            type="text"
            name="name"
            value={newGem.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={newGem.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Diamond">Diamond</option>
              <option value="Ruby">Ruby</option>
              <option value="Sapphire">Sapphire</option>
              <option value="Emerald">Emerald</option>
              <option value="Opal">Opal</option>
              <option value="Amethyst">Amethyst</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Carat Weight</label>
            <input
              type="number"
              step="0.01"
              name="carat"
              value={newGem.carat}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={newGem.color}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={newGem.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Certification</label>
            <input
              type="text"
              name="certification"
              value={newGem.certification}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Origin</label>
            <input
              type="text"
              name="origin"
              value={newGem.origin}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newGem.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="verified"
            id="gem-verified"
            checked={newGem.verified}
            onChange={handleChange}
          />
          <label htmlFor="gem-verified">Request Verification (additional fee applies)</label>
        </div>
        
        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGemstone;
