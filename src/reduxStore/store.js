import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './actions'
import orderReducer from './orderActions';
import userReducer from './userActions';
import { loadState } from "./browserStorage";

export default configureStore({
    reducer: {
        cart: cartReducer,
        orders: orderReducer,
        user: userReducer,
    },
    preloadedState: loadState(),
})