import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProfileSection from './ProfileSection';
import BookingsSection from './BookingsSection';
import AccommodationsSection from './AccommodationsSection';
import '../Styles/profile.css';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from '@mui/material';

const Profile = () => {
  const [value, setValue] = React.useState("one");
  const navigate = useNavigate();

  const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "#CE8722"
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sessionStorage.setItem('activeTab', String(newValue));
    navigate(newValue); // Update URL when tab changes
  };

  React.useEffect(() => {
    // Retrieve the active tab index from local storage on component mount
    const storedActiveTab = sessionStorage.getItem('activeTab');
    
    if (storedActiveTab) {
      setValue(storedActiveTab);
      
    }
  }, []);

  return (
    <div className='m-10'>
      <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', m: 3 }} className="tabs " >
        <Tabs
          value={value}
          onChange={handleChange}
          color="#CE8722"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#CE8722",
            },
          }}
          aria-label="secondary tabs example"
        >
          <StyledTab value="one" label="Profile" to="/profile" component={Link} />
          <StyledTab value="two" label="Bookings" to="bookings" component={Link} />
          <StyledTab value="three" label="Accommodations" to="accommodations" component={Link} />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<ProfileSection />} />
        <Route path="bookings" element={<BookingsSection />} />
        <Route path="accommodations" element={<AccommodationsSection />} />
      </Routes>
    </div>
  );
};

export default Profile;