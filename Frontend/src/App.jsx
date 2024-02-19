import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Form from "./routes/Form";
import Logout from "./routes/Logout";
import Login from "./routes/Login";
import Header from "./routes/Header";
import Profile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import AccommodationDetail from "./routes/AccommodationDetail";
import DashboardHeader from "./routes/DashboardHeader";
import ProfileSection from "./routes/ProfileSection"; // Import the ProfileSection component
import BookingsSection from "./routes/BookingsSection"; // Import the BookingsSection component
import AccommodationsSection from "./routes/AccommodationsSection"; // Import the AccommodationsSection component
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logoutUser, getUser } from "./slice/userSlice";
import { useNavigate } from "react-router-dom";
import DbBookings from "./routes/DbBookings";
import Statistics from "./routes/statistics";
const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
  };
  useEffect(() => {
    dispatch(getUser());
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== "/dashboard" && !location.pathname.startsWith("/dashboard") ? (
        <Router>
          <div className="App lg:pl-10 lg:pr-10 overflow-x-hidden ">
            <Header
              isLoggedIn={Boolean(userData)}
              onLogout={handleLogout}
              setSearchTerm={handleSearch}
              className="sticky top-0 z-50"
            />
            <Routes>
              <Route
                
                path="/"
                element={<Home searchTerm={searchTerm} />}
              />
              <Route path="/:id" element={<AccommodationDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Form" element={<Form />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />}>
                {/* Nested routes for Profile component */}
                <Route index element={<ProfileSection />} />
                <Route path="bookings" element={<BookingsSection />} />
                <Route
                  path="accommodations"
                  element={<AccommodationsSection />}
                />
              </Route>
            </Routes>
          </div>{" "}
        </Router>
      ) : (
        <Router className="">
          <DashboardHeader />
          <Routes>
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/dashboard/bookings" element={<DbBookings />} />
            <Route path="/dashboard/statistics" element={<Statistics/>} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
