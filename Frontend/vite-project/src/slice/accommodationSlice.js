// accommodationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  accommodations: [],
  singleAccommodation: null,
  status: "idle",
  error: null,
};

// Define async thunk to fetch accommodations
export const fetchAccommodations = createAsyncThunk(
  "accommodations/fetchAccommodations",
  async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/ownerhouses?_id=${_id}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchAccommodationById = createAsyncThunk(
  "accommodations/fetchAccommodationById",
  async (accommodationId) => {
    const response = await axios.get(
      `http://localhost:5000/api/house/${accommodationId}`
    );

    return response.data;
  }
);
// Define async thunk to add accommodation
export const addAccommodation = createAsyncThunk(
  "accommodations/addAccommodation",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const {
        title,
        description,
        price,
        location,
        checkInTime,
        checkOutTime,
        owner,
        pictures,
        features,
      } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("description", description);
      formDataToSend.append("price", price);
      formDataToSend.append("location", location);
      formDataToSend.append("checkInTime", checkInTime);
      formDataToSend.append("checkOutTime", checkOutTime);
      formDataToSend.append("owner", owner);
      features.forEach((feature, index) => {
        formDataToSend.append(`features[${index}]`, feature);
      })

      // Append each picture to the FormData
      pictures.forEach((file, index) => {
        formDataToSend.append("pictures", file);
      });

      const response = await axios.post(
        "http://localhost:5000/api/createhouses",
        formDataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data", // Important for Multer to handle files
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Send the error to the reducer
    }
  }
);

export const fetchAllAccommodations = createAsyncThunk(
  "accommodations/fetchAllAccommodations",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allhouses");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create accommodation slice
const accommodationSlice = createSlice({
  name: "accommodations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accommodations = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllAccommodations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAccommodations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accommodations = action.payload;
      })
      .addCase(fetchAllAccommodations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.accommodations.push(action.payload.house);
      })
      .addCase(fetchAccommodationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccommodationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleAccommodation = action.payload;
      })
      .addCase(fetchAccommodationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectAccommodations = (state) => state.accommodations;
export const selectSingleAccommodation = (state) =>
  state.accommodations.singleAccommodation;

export default accommodationSlice.reducer;
