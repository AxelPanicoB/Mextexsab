function ProductFilter({ categories, activeCategory, onCategoryChange, searchValue, onSearchChange }) {
  return (
    <div className="product-filter" id="productos">
      <div className="filter-search">
        <input
          type="search"
          placeholder="Buscar productos, sabores o categorías..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Buscar productos"
        />
      </div>
      <div className="filter-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
            type="button"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
