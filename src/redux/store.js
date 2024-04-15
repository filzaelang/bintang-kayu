import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import allProductsSlice from "./slices/allProductsSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: allProductsSlice,
    },
});

export default store;