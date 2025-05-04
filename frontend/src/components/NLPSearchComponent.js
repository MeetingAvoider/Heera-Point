import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchWithNLP } from "../actions/productActions";
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/NLPSearch.css";

const NLPSearchComponent = () => {
  const [query, setQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const dispatch = useDispatch();
  const nlpSearch = useSelector((state) => state.nlpSearchReducer);
  const { loading, error, nlpResults, success } = nlpSearch;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      dispatch(searchWithNLP(query));
      setSearchSubmitted(true);
    }
  };

  // Example search prompts
  const searchExamples = [
    "I need a power bank that charges fast",
    "What are good headphones for running?",
    "Show me phone cases for iPhone 13",
    "I'm looking for a wireless charger that works with Samsung",
  ];

  const handleExampleClick = (example) => {
    setQuery(example);
    dispatch(searchWithNLP(example));
    setSearchSubmitted(true);
  };

  // Format price with currency
  const formatPrice = (price) => {
    return `₹${Number(price).toFixed(2)}`;
  };

  return (
    <Container className="nlp-search-container">
      <div className="search-header">
        <h1>Smart Product Search</h1>
        <p className="text-muted">
          Ask in natural language and find exactly what you need
        </p>
      </div>

      <Form onSubmit={handleSearch} className="search-form">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Describe what you're looking for... (e.g., 'I need a power bank that charges fast')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </Form.Group>
        <Button type="submit" className="search-button" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Searching...</span>
            </>
          ) : (
            <>
              <i className="fas fa-search me-2"></i>
              Search
            </>
          )}
        </Button>
      </Form>

      {/* Search Examples */}
      <div className="search-examples">
        <p className="examples-title">Try searching for:</p>
        <div className="example-chips">
          {searchExamples.map((example, index) => (
            <Button
              key={index}
              variant="outline-primary"
              className="example-chip"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {error && <Alert variant="danger">{error}</Alert>}

      {searchSubmitted && !loading && success && nlpResults && (
        <div className="search-results">
          <div className="search-query">
            <h5>Results for: "{nlpResults.query}"</h5>
          </div>

          {/* Check if we have relevant products */}
          {nlpResults.relevantProducts &&
          nlpResults.relevantProducts.length > 0 ? (
            <Tabs defaultActiveKey="relevant" className="mb-4 result-tabs">
              <Tab eventKey="relevant" title="Most Relevant">
                <Row>
                  {nlpResults.relevantProducts.map((product) => (
                    <Col md={4} sm={6} key={product.id} className="mb-4">
                      <Card className="product-card">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          className="product-image"
                        />
                        <Card.Body>
                          <Card.Title className="product-title">
                            {product.name}
                          </Card.Title>
                          <Card.Text className="product-description">
                            {product.description &&
                            product.description.length > 100
                              ? `${product.description.substring(0, 100)}...`
                              : product.description}
                          </Card.Text>
                          <div className="product-footer">
                            <span className="product-price">
                              {formatPrice(product.price)}
                            </span>
                            <Link
                              to={`/product/${product.id}`}
                              className="view-button"
                            >
                              View Details
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab>

              {/* Create a tab for each category */}
              {nlpResults.categorySuggestions &&
                Object.entries(nlpResults.categorySuggestions).map(
                  ([category, products]) => {
                    // Only show categories with products
                    if (products && products.length > 0) {
                      // Get the human-readable category name
                      const categoryName = category
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");

                      return (
                        <Tab
                          eventKey={category}
                          title={categoryName}
                          key={category}
                        >
                          <Row>
                            {products.map((product) => (
                              <Col
                                md={4}
                                sm={6}
                                key={product.id}
                                className="mb-4"
                              >
                                <Card className="product-card">
                                  <Card.Img
                                    variant="top"
                                    src={product.image}
                                    className="product-image"
                                  />
                                  <Card.Body>
                                    <Card.Title className="product-title">
                                      {product.name}
                                    </Card.Title>
                                    <Card.Text className="product-description">
                                      {product.description &&
                                      product.description.length > 100
                                        ? `${product.description.substring(
                                            0,
                                            100
                                          )}...`
                                        : product.description}
                                    </Card.Text>
                                    <div className="product-footer">
                                      <span className="product-price">
                                        {formatPrice(product.price)}
                                      </span>
                                      <Link
                                        to={`/product/${product.id}`}
                                        className="view-button"
                                      >
                                        View Details
                                      </Link>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </Tab>
                      );
                    }
                    return null;
                  }
                )}
            </Tabs>
          ) : (
            <Alert variant="info">
              <p className="mb-0">
                No results found for your query. Try different search terms or
                browse categories.
              </p>
            </Alert>
          )}
        </div>
      )}

      {searchSubmitted && loading && (
        <div className="search-loading text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Analyzing your query with AI...</p>
        </div>
      )}
    </Container>
  );
};

export default NLPSearchComponent;
