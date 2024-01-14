// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import accommodationReducer from '../slice/accommodationSlice';
import bookingReducer from '../slice/bookingSlice';
import reviewsReducer from '../slice/reviewSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    accommodations: accommodationReducer,
    booking: bookingReducer,
    reviews: reviewsReducer,

  },
});

export default store;
