import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
} from "react-bootstrap";
import { login } from "../actions/userActions";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // reducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { error, userInfo } = userLoginReducer;

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
    } else {
      dispatch(login(username, password));
    }
    setValidated(true);
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="login-card shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-3">Welcome Back</h2>
                  <p className="text-muted">Sign in to access your account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="username">
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
                      Please provide a valid username.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
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
                      Please provide a valid password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-center mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="login-btn px-5"
                    >
                      Sign In
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-decoration-none fw-bold"
                      >
                        Sign up
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

export default LoginPage;
