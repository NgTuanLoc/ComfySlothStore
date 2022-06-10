import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      }
      const newItem = {
        id: id + color,
        name: product.name,
        color: color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };

    case REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      return {
        ...state,
        cart: tempCart,
      };
    }

    case CLEAR_CART:
      return { ...state, cart: [] };

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          if (value === "incr") {
            let newAmount = cartItem.amount + 1;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
        }
        if (value === "decr") {
          let newAmount = cartItem.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...cartItem, amount: newAmount };
        }
        return cartItem;
      });

      return { ...state, cart: tempCart };
    }

    case COUNT_CART_TOTALS: {
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, cartItem) => {
          const { price, amount } = cartItem;
          total.totalItems += amount;
          total.totalAmount += price * amount;
          return total;
        },
        { totalItems: 0, totalAmount: 0 }
      );
      return { ...state, totalItems, totalAmount };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
