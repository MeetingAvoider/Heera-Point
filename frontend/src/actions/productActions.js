import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CHANGE_DELIVERY_STATUS_REQUEST,
  CHANGE_DELIVERY_STATUS_SUCCESS,
  CHANGE_DELIVERY_STATUS_FAIL,
  NLP_SEARCH_REQUEST,
  NLP_SEARCH_SUCCESS,
  NLP_SEARCH_FAIL,
} from "../constants/index";

import axios from "axios";

// products list
export const getProductsList =
  (keyword = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCTS_LIST_REQUEST,
      });

      // Construct URL with parameters
      let url = "/api/products/";

      // Add search or category parameters if they exist
      if (keyword && keyword.includes("search=")) {
        const searchValue = keyword.split("=")[1];
        url = `/api/products/?keyword=${searchValue}`;
      } else if (category) {
        url = `/api/products/?category=${category}`;
      }

      // Call API
      const { data } = await axios.get(url);

      dispatch({
        type: PRODUCTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCTS_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    // call api
    const { data } = await axios.get(`/api/product/${id}/`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// create product
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    // login reducer
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // api call
    const { data } = await axios.post("/api/product-create/", product, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    // login reducer
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // api call
    const { data } = await axios.delete(`/api/product-delete/${id}/`, config);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// update product
export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    // login reducer
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // api call
    const { data } = await axios.put(
      `/api/product-update/${id}/`,
      product,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// change ordered product delivery status
export const changeDeliveryStatus =
  (id, product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHANGE_DELIVERY_STATUS_REQUEST,
      });

      // login reducer
      const {
        userLoginReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // api call
      const { data } = await axios.put(
        `/account/change-order-status/${id}/`,
        product,
        config
      );

      dispatch({
        type: CHANGE_DELIVERY_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_DELIVERY_STATUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// Get all product categories
export const getProductCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "PRODUCT_CATEGORIES_REQUEST",
    });

    // Call API - the path should match your Django URL pattern
    const { data } = await axios.get("/api/categories/");

    // Create a formatted array if the API returns an object
    const categoriesArray = Array.isArray(data)
      ? data
      : Object.entries(data).map(([id, name]) => ({ id, name }));

    dispatch({
      type: "PRODUCT_CATEGORIES_SUCCESS",
      payload: categoriesArray,
    });
  } catch (error) {
    console.error("Categories fetch error:", error);
    dispatch({
      type: "PRODUCT_CATEGORIES_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// NLP search
export const searchWithNLP = (query) => async (dispatch) => {
  try {
    dispatch({ type: NLP_SEARCH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/nlp-search/", { query }, config);

    dispatch({
      type: NLP_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NLP_SEARCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
