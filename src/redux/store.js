import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import allProductsSlice from "./slices/allProductsSlice";
import userOrderSlice from "./slices/userOrderSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: allProductsSlice,
        orderList: userOrderSlice,
    },
});

export default store;