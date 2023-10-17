import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

// Комбинирование всех редьюсеров в один корневой редьюсер
const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;