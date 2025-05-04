import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ModernProduct.css";

function Product({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.stock,
        qty: 1,
      },
    });
  };

  // Extract category from product or use default one
  const category = product.category
    ? product.category
        .replace("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "Tech Accessory";

  return (
    <div className="modern-product-card">
      {/* Stock Badge */}
      {product.stock <= 0 && (
        <div className="product-badge out-of-stock">Out of Stock</div>
      )}
      {product.stock > 0 && product.stock <= 5 && (
        <div className="product-badge">Low Stock</div>
      )}

      {/* Product Image with Quick View */}
      <div className="product-img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="modern-product-img"
          />
          <button className="quick-view-btn">Quick View</button>
        </Link>
      </div>

      {/* Product Details */}
      <div className="modern-product-body">
        <div className="product-category">{category}</div>

        <Link
          to={`/product/${product.id}`}
          className="modern-product-title-link"
        >
          <h3 className="modern-product-title">{product.name}</h3>
        </Link>

        <div className="modern-ratings-container">
          <div className="modern-ratings">
            <i
              className={
                product.rating >= 1
                  ? "fas fa-star"
                  : product.rating >= 0.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
            <i
              className={
                product.rating >= 2
                  ? "fas fa-star"
                  : product.rating >= 1.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
            <i
              className={
                product.rating >= 3
                  ? "fas fa-star"
                  : product.rating >= 2.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
            <i
              className={
                product.rating >= 4
                  ? "fas fa-star"
                  : product.rating >= 3.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
            <i
              className={
                product.rating >= 5
                  ? "fas fa-star"
                  : product.rating >= 4.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </div>
          {product.numReviews > 0 && (
            <span className="rating-count">({product.numReviews})</span>
          )}
        </div>

        <div className="modern-product-price-container">
          <div className="modern-product-price">
            ₹{product.price.toLocaleString()}
          </div>

          {/* If you have original price and discount data, uncomment these lines
          <div className="original-price">₹{(product.price * 1.2).toLocaleString()}</div>
          <div className="discount-percentage">20% off</div>
          */}
        </div>

        <button
          className="modern-add-to-cart-btn"
          onClick={addToCartHandler}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default Product;
