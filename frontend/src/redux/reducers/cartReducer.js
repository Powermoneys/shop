import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

// Начальное состояние корзины
const initialState = [];

// Редьюсер корзины
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Добавление товара в корзину, если он еще не есть в ней
      if (!state.find((item) => item.id === action.payload.id)) {
        return [...state, action.payload];
      } else {
        return state;
      }
    case REMOVE_FROM_CART:
      // Удаление товара из корзины по id
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default cartReducer;
