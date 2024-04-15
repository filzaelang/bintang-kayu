import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

export const userOrderSlice = createSlice({
    name: "userOrder",
    initialState: initialState,
    reducers: {
        GET_ORDER_LIST: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { GET_ORDER_LIST } = userOrderSlice.actions

export default userOrderSlice.reducer