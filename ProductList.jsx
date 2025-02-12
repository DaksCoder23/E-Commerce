import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ products, addToCart }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Extract categories dynamically
  const categories = [...new Set(products.map((p) => p.category))];

  // 🎯 Apply filters in real-time
  useEffect(() => {
    let updatedProducts = products;

    if (category) updatedProducts = updatedProducts.filter((p) => p.category === category);
    if (minPrice) updatedProducts = updatedProducts.filter((p) => p.price >= parseFloat(minPrice));
    if (maxPrice) updatedProducts = updatedProducts.filter((p) => p.price <= parseFloat(maxPrice));
    if (minRating) updatedProducts = updatedProducts.filter((p) => p.rating.rate >= parseFloat(minRating));

    setFilteredProducts(updatedProducts);
  }, [category, minPrice, maxPrice, minRating, products]); // Runs when any filter changes

  return (
    <div className="product-page">
      {/* Sidebar for Filters */}
      <aside className="sidebar">
        <h2>Filters</h2>

        {/* Category Filter */}
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Price Range Filter (Slider) */}
        <label>Price Range: ${minPrice} - ${maxPrice}</label>
        <input type="range" min="0" max="500" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

        {/* Rating Filter (Dropdown) */}
        <label>Sort by Rating:</label>
        <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
          <option value="">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        {/* Reset Button */}
        <button onClick={() => { setCategory(""); setMinPrice(""); setMaxPrice(""); setMinRating(""); }}>
          Reset Filters
        </button>
      </aside>

      {/* Product List */}
      <div className="products">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Rating: {product.rating.rate} ⭐</p>
              <div className="button-container">
                <Link to={`/product/${product.id}`} className="view-details-button">
                  View Details
                </Link>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
