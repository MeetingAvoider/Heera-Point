import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import {
  Spinner,
  Row,
  Col,
  Container,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  CREATE_PRODUCT_RESET,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
  CARD_CREATE_RESET,
} from "../constants";
import "../components/ModernProductDetails.css";

function ProductDetailsPage({ history, match }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // modal state and functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // product details reducer
  const productDetailsReducer = useSelector(
    (state) => state.productDetailsReducer
  );
  const { loading, error, product } = productDetailsReducer;

  // login reducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // product details reducer
  const deleteProductReducer = useSelector(
    (state) => state.deleteProductReducer
  );
  const { success: productDeletionSuccess } = deleteProductReducer;

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
    dispatch({
      type: UPDATE_PRODUCT_RESET,
    });
    dispatch({
      type: CREATE_PRODUCT_RESET,
    });
    dispatch({
      type: CARD_CREATE_RESET,
    });
  }, [dispatch, match]);

  // product delete confirmation
  const confirmDelete = () => {
    dispatch(deleteProduct(match.params.id));
    handleClose();
  };

  // add to cart handler
  const addToCartHandler = () => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.stock,
        qty: quantity,
      },
    });
    // Optional: Add a notification here
  };

  // after product deletion
  if (productDeletionSuccess) {
    alert("Product successfully deleted.");
    history.push("/");
    dispatch({
      type: DELETE_PRODUCT_RESET,
    });
  }

  // Determine stock status
  const getStockStatus = () => {
    if (!product.stock || product.stock <= 0) {
      return { class: "out-of-stock", text: "Out of Stock" };
    } else if (product.stock <= 5) {
      return { class: "low-stock", text: "Low Stock" };
    } else {
      return { class: "in-stock", text: "In Stock" };
    }
  };

  // Extract category from product or use default one
  const getCategory = () => {
    return product.category
      ? product.category
          .replace("_", " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "Tech Accessory";
  };

  return (
    <div className="product-details-container">
      {/* Modern Modal */}
      <Modal show={show} onHide={handleClose} className="modern-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <i
              style={{ color: "#EF4444" }}
              className="fas fa-exclamation-triangle"
            ></i>
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product <em>"{product.name}"</em>
          ?
          <br />
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" className="cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="confirm-delete-btn"
            onClick={() => confirmDelete()}
          >
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <div className="d-flex align-items-center justify-content-center py-5">
          <Spinner
            animation="border"
            role="status"
            style={{ color: "#4F46E5" }}
          />
          <span className="ml-3 font-weight-bold">
            Loading product details...
          </span>
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row className="g-4">
            {/* Product Images Column */}
            <Col lg={6} md={6}>
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-detail-image"
                />
              </div>

              {/* Admin Actions */}
              {userInfo && userInfo.admin && (
                <div className="admin-actions">
                  <button className="admin-btn delete-btn" onClick={handleShow}>
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                  <button
                    className="admin-btn edit-btn"
                    onClick={() =>
                      history.push(`/product-update/${product.id}/`)
                    }
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                </div>
              )}
            </Col>

            {/* Product Details Column */}
            <Col lg={6} md={6}>
              <div className="product-details-header">
                <div className="product-category">{getCategory()}</div>
                <h1 className="product-title">{product.name}</h1>

                <div className="product-rating-container">
                  <div className="product-rating">
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
                    <span className="review-count">
                      {product.numReviews} reviews
                    </span>
                  )}
                </div>
              </div>

              <div className="product-price-section">
                <div className="current-price">
                  ₹{product.price?.toLocaleString()}
                </div>
                {/* Uncomment if you have original price data
                <div className="original-price">₹{(product.price * 1.2)?.toLocaleString()}</div>
                <div className="discount-badge">20% OFF</div>
                */}
              </div>

              <div className="product-description">{product.description}</div>

              <div className="product-meta">
                <div className="meta-item">
                  <div className="meta-label">Availability</div>
                  <div className={`stock-status ${getStockStatus().class}`}>
                    {getStockStatus().text}
                  </div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">SKU</div>
                  <div className="meta-value">
                    PROD-{product.id?.toString().padStart(4, "0")}
                  </div>
                </div>
              </div>

              {product.stock > 0 && (
                <div className="add-to-cart-section">
                  <div className="quantity-selector">
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                      -
                    </button>
                    <input
                      type="text"
                      className="quantity-input"
                      value={quantity}
                      readOnly
                    />
                    <button className="quantity-btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={addToCartHandler}
                    disabled={product.stock <= 0}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    Add to Cart
                  </button>

                  <Link
                    to={`${product.id}/checkout/`}
                    className="text-decoration-none"
                  >
                    <button
                      className="buy-now-btn"
                      disabled={product.stock <= 0}
                    >
                      <i className="fas fa-bolt"></i>
                      Buy Now with Stripe
                    </button>
                  </Link>
                </div>
              )}

              {product.stock <= 0 && (
                <Message variant="danger">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    This product is currently out of stock. Please check back
                    later.
                  </div>
                </Message>
              )}

              <div className="shipping-info">
                <div className="shipping-item">
                  <i className="fas fa-truck shipping-icon"></i>
                  <div className="shipping-title">Free Shipping</div>
                  <div className="shipping-text">On orders over ₹500</div>
                </div>
                <div className="shipping-item">
                  <i className="fas fa-undo shipping-icon"></i>
                  <div className="shipping-title">Easy Returns</div>
                  <div className="shipping-text">30 days return policy</div>
                </div>
                <div className="shipping-item">
                  <i className="fas fa-shield-alt shipping-icon"></i>
                  <div className="shipping-title">Secure Checkout</div>
                  <div className="shipping-text">100% Protected Payments</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductDetailsPage;
