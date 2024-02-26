import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  userRoles: [],
  loading: false,
  error: null,
};

export const getReviewsPerBookings = createAsyncThunk(
  'chart/getReviewsPerBookings',
  async () => {
    try {
      const response = await axios.get('https://hostia.pp.ua/api/reviewchart');
      console.log(response.data);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
)
export const getusersRoles = createAsyncThunk(
  'chart/getusersRoles',
  async () => {
    try {
      const response = await axios.get('https://hostia.pp.ua/api/usersroles');
      console.log(response.data);
      return response.data;
    }
    catch (error) {
        throw error;

    }
  }
)

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsPerBookings.pending, (state) => {
        state.loading = true;

      })
      .addCase(getReviewsPerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getReviewsPerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getusersRoles.pending, (state) => {
        state.loading = true;

      })
      .addCase(getusersRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.userRoles = action.payload;
      })
      .addCase(getusersRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  }
});
export const selectChartData = (state) => state.chart.userRoles
export const selectReviwesChart = (state) => state.chart.data

export default chartSlice.reducer;