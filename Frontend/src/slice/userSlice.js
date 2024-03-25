// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
};
export const getUser = createAsyncThunk("getUser", async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get("https://backtea.onrender.com/api/getLogedUser", {
      headers: headers,
    });

    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Let the rejection be handled by the `getUser.rejected` case
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // Handle unauthorized response here if needed
        if (action.payload?.response?.status === 401) {
          // Dispatch an action to log the user out or handle unauthorized scenario
        }
      });
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
