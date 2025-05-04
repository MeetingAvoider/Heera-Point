import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
} from "react-bootstrap";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import "./RegisterPage.css";

function RegisterPage({ history, variant }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  // reducer
  const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
  const { error, userInfo } = userRegisterReducer;

  useEffect(() => {
    if (userInfo) {
      history.push("/"); // homepage
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(register(username, email, password));
    }

    setValidated(true);
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="register-card shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-3">Create Account</h2>
                  <p className="text-muted">
                    Sign up to get started with Heera Point
                  </p>
                </div>

                {message && (
                  <Alert variant="danger" className="text-center">
                    {message}
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control-lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control-lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control-lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control-lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please confirm your password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-center mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="register-btn px-5"
                    >
                      Sign Up
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-decoration-none fw-bold"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterPage;
