import React from 'react';
import AuthBadge from './AuthBadge';

function GemstoneCard({ gemstone }) {
  return (
    <div className="gemstone-card">
      <div className="gem-image">
        <img src={gemstone.image} alt={gemstone.name} />
        {gemstone.verified && <AuthBadge />}
      </div>
      <div className="gem-info">
        <h3>{gemstone.name}</h3>
        <div className="gem-details">
          <p><strong>Type:</strong> {gemstone.type}</p>
          <p><strong>Carat:</strong> {gemstone.carat}</p>
          <p><strong>Color:</strong> {gemstone.color}</p>
          <p><strong>Origin:</strong> {gemstone.origin}</p>
          <p><strong>Certification:</strong> {gemstone.certification}</p>
        </div>
        <p className="gem-description">{gemstone.description}</p>
        <div className="gem-footer">
          <span className="gem-price">${gemstone.price.toLocaleString()}</span>
          <button className="purchase-btn">Purchase</button>
        </div>
      </div>
    </div>
  );
}

export default GemstoneCard;