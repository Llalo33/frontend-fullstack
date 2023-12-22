import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: []
}

export const fetchUser = createAsyncThunk('users/fetch', async(data, thunkAPI) => {
        try {
            const res = await fetch('http://localhost:3000/users')
            if (!res.ok) {
                return thunkAPI
            }
            const user = await res.json()
            return thunkAPI.fulfillWithValue(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})

export default userSlice.reducer