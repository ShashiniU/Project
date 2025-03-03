import React from 'react';

function SearchFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="search-filters">
      <h2>Search Filters</h2>
      
      <div className="filter-group">
        <label>Gemstone Type</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All Types</option>
          <option value="Diamond">Diamond</option>
          <option value="Ruby">Ruby</option>
          <option value="Sapphire">Sapphire</option>
          <option value="Emerald">Emerald</option>
          <option value="Opal">Opal</option>
          <option value="Amethyst">Amethyst</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Price Range ($)</label>
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleChange}
          />
          <span>to</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="filter-group checkbox-group">
        <input
          type="checkbox"
          name="verified"
          id="verified"
          checked={filters.verified}
          onChange={handleChange}
        />
        <label htmlFor="verified">Verified Only</label>
      </div>
    </div>
  );
}

export default SearchFilters;