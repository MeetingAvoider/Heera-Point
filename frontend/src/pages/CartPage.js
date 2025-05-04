import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import { addToCart, removeFromCart, clearCart } from "../actions/cartActions";
import Message from "../components/Message";
import "./CartPage.css";

const CartPage = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const shippingFee = subtotal > 1000 ? 0 : 150;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingFee + tax;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      history.push("/login?redirect=checkout");
    } else {
      history.push("/checkout");
    }
  };

  const updateQuantityHandler = (product, qty) => {
    dispatch(addToCart({ ...product }, Number(qty)));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  return (
    <Container className="cart-page py-4">
      <h1 className="mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message variant="info">
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
            <h4>Your cart is empty</h4>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <Card className="cart-items-card mb-4">
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="cart-item">
                    <Row className="align-items-center">
                      <Col xs={3} sm={2}>
                        <Link to={`/product/${item.id}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            className="cart-item-img"
                          />
                        </Link>
                      </Col>
                      <Col xs={9} sm={4}>
                        <Link
                          to={`/product/${item.id}`}
                          className="cart-item-name"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col sm={2} className="text-center">
                        <div className="price">₹{item.price}</div>
                      </Col>
                      <Col sm={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            updateQuantityHandler(item, e.target.value)
                          }
                          className="qty-select"
                        >
                          {[...Array(item.countInStock).keys()]
                            .slice(0, 10)
                            .map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                        </Form.Control>
                      </Col>
                      <Col xs={12} sm={2} className="text-right">
                        <Button
                          type="button"
                          variant="light"
                          className="remove-btn"
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Footer className="text-right">
                <Button
                  variant="outline-danger"
                  className="clear-cart-btn"
                  onClick={clearCartHandler}
                >
                  <i className="fas fa-trash mr-1"></i> Clear Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="order-summary-card">
              <Card.Header className="card-header-custom">
                <h3 className="mb-0">Order Summary</h3>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items ({itemsCount}):</Col>
                    <Col className="text-right">₹{subtotal.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col className="text-right">
                      {shippingFee === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        `₹${shippingFee.toFixed(2)}`
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax (18% GST):</Col>
                    <Col className="text-right">₹{tax.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total:</strong>
                    </Col>
                    <Col className="text-right">
                      <strong>₹{total.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      className="checkout-btn"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>

            <Card className="mt-3 shipping-note-card">
              <Card.Body>
                <Card.Title className="shipping-title">
                  <i className="fas fa-shipping-fast mr-2"></i> Shipping
                  Information
                </Card.Title>
                <div className="shipping-details">
                  <p>Free shipping on orders over ₹1000</p>
                  <p>Expected delivery: 3-5 business days</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
