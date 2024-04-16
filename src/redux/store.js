import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import allProductsSlice from "./slices/allProductsSlice";
import userOrderSlice from "./slices/userOrderSlice";
import currentUserSlice from "./slices/currentUserSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: allProductsSlice,
        orderList: userOrderSlice,
        currentUser: currentUserSlice,
    },
});

export default store;