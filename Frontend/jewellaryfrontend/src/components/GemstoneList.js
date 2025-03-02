import React from 'react';
import GemstoneCard from './GemstoneCard';

function GemstoneList({ gemstones }) {
  return (
    <div className="gemstone-list">
      <h2>Featured Gemstones</h2>
      {gemstones.length === 0 ? (
        <p className="no-results">No gemstones match your filters.</p>
      ) : (
        <div className="gemstone-grid">
          {gemstones.map(gemstone => (
            <GemstoneCard key={gemstone.id} gemstone={gemstone} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GemstoneList;