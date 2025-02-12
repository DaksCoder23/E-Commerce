import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/products')} className="back-button">
        Back to Products
      </button>
      <div className="detail-card">
        <div className="detail-content">
          <div className="detail-image-container">
            <img src={product.image} alt={product.title} className="detail-image" />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{product.title}</h1> 
            <p className="detail-price">${product.price ? product.price.toFixed(2) : "N/A"}</p>
            <p className="product-rating">⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
            <p className="detail-description">{product.description}</p>
            
            <button onClick={() => addToCart(product)} className="add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
