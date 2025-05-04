import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsList,
  getProductCategories,
} from "../actions/productActions";
import Message from "../components/Message";
import {
  Spinner,
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Dropdown,
  Button,
  Nav,
} from "react-bootstrap";
import Product from "../components/Product";
import { useHistory } from "react-router-dom";
import { CREATE_PRODUCT_RESET } from "../constants";
import "./ProductsListPage.css";

function ProductsListPage() {
  let history = useHistory();
  let searchTerm = history.location.search;
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Featured");
  const [selectedCategory, setSelectedCategory] = useState("");

  // products list reducer
  const productsListReducer = useSelector((state) => state.productsListReducer);
  const { loading, error, products } = productsListReducer;

  // categories reducer with default empty array
  const productCategoriesReducer = useSelector(
    (state) => state.productCategoriesReducer || {}
  );
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories = [], // Provide empty array default if categories is undefined
  } = productCategoriesReducer;

  useEffect(() => {
    // Get category from URL if available
    const params = new URLSearchParams(searchTerm);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    // Fetch products based on search or category
    dispatch(getProductsList(searchTerm, selectedCategory));
    dispatch({
      type: CREATE_PRODUCT_RESET,
    });

    // Fetch categories
    dispatch(getProductCategories());
  }, [dispatch, searchTerm, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      history.push(`/?search=${localSearch.toLowerCase()}`);
    } else {
      history.push("/");
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    history.push(`/?category=${categoryId}`);
  };

  // Function to filter products by category
  const getFilteredProducts = () => {
    if (!products) return [];

    let filteredProducts = products;

    // Filter by category if selected
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term if provided
    if (searchTerm && searchTerm.includes("search=")) {
      const searchValue = searchTerm.split("=")[1].toLowerCase();
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
    }

    return filteredProducts;
  };

  // Function to sort products
  const getSortedProducts = () => {
    const filteredProducts = getFilteredProducts();

    if (sortOrder === "Price: Low to High") {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price: High to Low") {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Name: A to Z") {
      return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Name: Z to A") {
      return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
    }

    return filteredProducts;
  };

  const showNothingMessage = () => {
    return (
      <div className="nothing-found">
        {!loading ? (
          <Message variant="info">
            <div className="text-center py-4">
              <i className="fas fa-search fa-3x mb-3 text-muted"></i>
              <h4>No products found</h4>
              <p>Try different search terms or browse all products</p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setSelectedCategory("");
                  history.push("/");
                }}
              >
                View All Products
              </Button>
            </div>
          </Message>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <Container className="products-page">
      <div className="page-header">
        <h1 className="products-title">Our Products</h1>
        <p className="text-muted">Discover our quality selection of products</p>
      </div>

      {/* Categories Navigation */}
      <div className="categories-nav mb-4">
        <Nav className="categories-container">
          <Nav.Item>
            <Nav.Link
              active={selectedCategory === ""}
              onClick={() => {
                setSelectedCategory("");
                history.push("/");
              }}
              className="category-link"
            >
              All Products
            </Nav.Link>
          </Nav.Item>
          {categories && categories.length > 0
            ? categories.map((category) => (
                <Nav.Item key={category.id}>
                  <Nav.Link
                    active={selectedCategory === category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="category-link"
                  >
                    {category.name}
                  </Nav.Link>
                </Nav.Item>
              ))
            : null}
        </Nav>
      </div>

      <div className="filters-section mb-4">
        <Row>
          <Col md={8}>
            <form onSubmit={handleSearch}>
              <InputGroup>
                <FormControl
                  placeholder="Search products..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="search-input"
                />
                <Button variant="primary" type="submit">
                  <i className="fas fa-search"></i> Search
                </Button>
              </InputGroup>
            </form>
          </Col>
          <Col md={4}>
            <Dropdown className="float-md-end">
              <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
                Sort by: {sortOrder}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSort("Featured")}>
                  Featured
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort("Price: Low to High")}>
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort("Price: High to Low")}>
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort("Name: A to Z")}>
                  Name: A to Z
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort("Name: Z to A")}>
                  Name: Z to A
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      {error && <Message variant="danger">{error}</Message>}
      {categoriesError && <Message variant="danger">{categoriesError}</Message>}

      {loading || categoriesLoading ? (
        <div className="text-center py-5">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{ width: "50px", height: "50px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h5 className="mt-3">Loading Products...</h5>
        </div>
      ) : (
        <div className="products-grid">
          {getSortedProducts().length === 0 ? (
            showNothingMessage()
          ) : (
            <Row>
              {getSortedProducts().map((product) => (
                <Col
                  key={product.id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-4"
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </Container>
  );
}

export default ProductsListPage;
