// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
};
export const getUser = createAsyncThunk("getUser", async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };
  const serializedHeaders = JSON.stringify(headers);

  const res = axios
    .get("http://localhost:5000/api/getLogedUser", {
      headers: JSON.parse(serializedHeaders),
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
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
        state.user = action.payload.data.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
