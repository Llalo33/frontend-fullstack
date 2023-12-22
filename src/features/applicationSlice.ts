import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  error: string | null
}

const initialState = {
  error: "",
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem('token'),
};

export const authSignUp = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: data.login, password: data.password }),
      });

      const auth = await res.json();

      if (auth.errors) {
        return thunkAPI.rejectWithValue(auth.errors.errors[0].msg);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginSignIn = createAsyncThunk(
  "login/signin",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: data.login, password: data.password }),
      });
      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      return thunkAPI.fulfillWithValue(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = false;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(loginSignIn.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload);
      });
  },
});

export default applicationSlice.reducer;
