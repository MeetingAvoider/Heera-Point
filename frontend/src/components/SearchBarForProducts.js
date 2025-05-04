import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

function SearchBarForProducts() {
  let history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      history.push(`/?searchTerm=${searchTerm}`);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <div className="search-input-container">
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            value={searchTerm}
            placeholder="Search products..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBarForProducts;
