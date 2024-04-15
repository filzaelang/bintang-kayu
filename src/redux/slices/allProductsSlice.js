import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

export const allProductsSlice = createSlice({
    name: "allProducts",
    initialState: initialState,
    reducers: {
        GET_PRODUCTS: (state, action) => {
            console.log("Blablabla", action.payload)
            state.data = action.payload
        }
    }
})

export const { GET_PRODUCTS } = allProductsSlice.actions

export default allProductsSlice.reducer