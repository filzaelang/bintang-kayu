import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
}

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: initialState,
    reducers: {
        GET_USER: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { GET_USER } = currentUserSlice.actions

export default currentUserSlice.reducer