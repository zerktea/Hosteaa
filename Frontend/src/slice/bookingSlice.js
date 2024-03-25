// bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bookings: [],
  singleBooking: [],
  housebookings: [],
  allbookings: [],
  status: "idle",
  error: null,
};

// Async thunk to create a new booking
export const createBookingAsync = createAsyncThunk(
  "booking/createBooking",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://backtea.onrender.com/api/newbooking",
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
        `https://backtea.onrender.com/api/bookings/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchBookingByHouseId = createAsyncThunk(
  "booking/fetchBookingByHouseId",
  async (houseId, { rejectWithValue }) => {
    try {
      console.log(houseId);
      const response = await axios.get(
        `https://backtea.onrender.com/api/bookings/house/${houseId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to fetch all bookings
export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAllBookings",
  async () => {
    try {
      const response = await axios.get("https://backtea.onrender.com/api/allbookings");
      console.log(response.data);
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
    builder
      .addCase(fetchBookingByHouseId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingByHouseId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.housebookings = action.payload;
      })
      .addCase(fetchBookingByHouseId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.status = "loading";

      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allbookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export const selectAllBookings = (state) => state.booking.bookings;
export const selectHouseBookings = (state) => state.booking.housebookings;
export const selectBookings = (state) => state.booking.singleBooking;
export const selectallBookings = (state) => state.booking.allbookings;

export default bookingSlice.reducer;
