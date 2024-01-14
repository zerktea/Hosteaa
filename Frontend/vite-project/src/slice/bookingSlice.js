// bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bookings: [],
  singleBooking: [],
  status: "idle",
  error: null,
};

// Async thunk to create a new booking
export const createBookingAsync = createAsyncThunk(
  "booking/createBooking",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/newbooking",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to fetch all bookings for a user
export const fetchBookingsAsync = createAsyncThunk(
  "booking/fetchBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for createBookingAsync
    builder
      .addCase(createBookingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBookingAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Append the new booking to the existing bookings
        state.bookings.push(action.payload);
      })
      .addCase(createBookingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Reducer for fetchBookingsAsync
    builder
      .addCase(fetchBookingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleBooking = action.payload;
      })
      .addCase(fetchBookingsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectBookings = (state) => state.booking.singleBooking;
export default bookingSlice.reducer;
