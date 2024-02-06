import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  status: "idle",
  error: null,
};

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/newreview",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchReviewsPerUser = createAsyncThunk(
  "reviews/fetchReviewsPerUser",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/userreviews/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
)
export const fetchReviewsPerHouse = createAsyncThunk(
  "reviews/fetchReviewsPerHouse",
  async (houseId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/${houseId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReviewsPerHouse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsPerHouse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsPerHouse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReviewsPerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsPerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchReviewsPerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectReviews = (state) => state.reviews.reviews;



export default reviewSlice.reducer;
