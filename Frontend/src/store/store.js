// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import accommodationReducer from '../slice/accommodationSlice';
import bookingReducer from '../slice/bookingSlice';
import reviewsReducer from '../slice/reviewSlice';
import chartReducer from '../slice/chartSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    accommodations: accommodationReducer,
    booking: bookingReducer,
    reviews: reviewsReducer,
    chart: chartReducer,

  },
});

export default store;
