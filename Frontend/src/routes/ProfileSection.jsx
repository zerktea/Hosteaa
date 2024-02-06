import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";
import "../Styles/ProfileSection.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Button from "@mui/material-next/Button";
import Box from "@mui/material/Box";
import { Input, InputLabel, FormControl } from "@mui/material";

import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
const useStyles = styled((theme) => ({
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Adjust this value based on your requirements
  },
}));
const ProfileSection = () => {
  const user = useSelector(selectUser);
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    // Handle the file change here
  };
  const handleSave = async () => {
    try {
      if (selectedFile) {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append("profilePicture", selectedFile);
        formData.append("userId", user._id);

        // Send a POST request to your server to upload the image
        const response = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Assuming the server responds with the image URL
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="profile-section">
        <h2>User Profile</h2>
        {user ? (
          <form>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 3,
                flexDirection: "column",
              }}
            >
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Name</InputLabel>
                <Input id="component-disabled" defaultValue={user.name} />
              </FormControl>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Email</InputLabel>
                <Input id="component-disabled" defaultValue={user.email} />
              </FormControl>

              <div className="Profilepic">
                <img
                  className="profile-pic"
                  src={`http://localhost:5000/${user.profilePic}`}
                  alt="Profile"
                  onClick={handleProfileClick}
                  style={{ cursor: "pointer" }}
                />

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <div type="button" onClick={handleSave}>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "#011627",
                      borderColor: "#00B5A3",
                      borderRadius: "10px",
                      "&:hover": { bgcolor: "#00B5A3", color: "white" },
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Box>
            {/* Add more fields based on your user data structure */}
          </form>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </Box>
  );
};

export default ProfileSection;
