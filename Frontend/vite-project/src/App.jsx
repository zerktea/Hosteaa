// App.js

import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Form from "./routes/Form";
import Logout from "./routes/Logout";
import Login from "./routes/Login";
import Header from "./routes/Header";
import Profile from "./routes/Profile";
import AccommodationDetail from "./routes/AccommodationDetail";
import ProfileSection from "./routes/ProfileSection"; // Import the ProfileSection component
import BookingsSection from "./routes/BookingsSection"; // Import the BookingsSection component
import AccommodationsSection from "./routes/AccommodationsSection"; // Import the AccommodationsSection component
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logoutUser, getUser } from "./slice/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (<>
    <Router>
      <div className="App min-h-screen overflow-x-hidden pt-8">
        <Header isLoggedIn={Boolean(userData)} onLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<AccommodationDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />}>
            {/* Nested routes for Profile component */}
            <Route index element={<ProfileSection />} />
            <Route path="bookings" element={<BookingsSection />} />
            <Route path="accommodations" element={<AccommodationsSection />} />
          </Route>
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
