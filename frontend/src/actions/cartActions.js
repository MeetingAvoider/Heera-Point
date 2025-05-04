// Cart actions to handle cart operations
export const addToCart =
  (product, qty = 1) =>
  (dispatch, getState) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: qty,
      },
    });

    // Save to localStorage to persist cart data
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "CART_REMOVE_ITEM",
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: "CART_CLEAR_ITEMS",
  });

  localStorage.removeItem("cartItems");
};
