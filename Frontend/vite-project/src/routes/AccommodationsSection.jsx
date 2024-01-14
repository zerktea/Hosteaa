// AccommodationComponent.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";
import {
  addAccommodation,
  fetchAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material-next/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import { CardActionArea, CardContent } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";


const AccommodationComponent = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    pictures: [],
    checkInTime: "",
    checkOutTime: "",
    features: [],
  });

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accommodations = useSelector(selectAccommodations);

  const fetchAccommodationsData = async () => {
    try {
      if (user && user._id) {
        dispatch(fetchAccommodations(user._id));
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  useEffect(() => {
    fetchAccommodationsData();
  }, [user]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const previews = [];

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const newImages = Array.from(files);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: [...prevFormData[name], ...newImages],
    }));
   

    Promise.all(
      newImages.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        });
      })
    ).then((previews) => {
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      
    });
  };

  const handleAddAccommodation = (e) => {
    e.preventDefault();

    const newHouseData = {
      ...formData,
      owner: user._id,
    };

    dispatch(addAccommodation(newHouseData));
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      pictures: [],
      checkInTime: "",
      checkOutTime: "",
      features: [],
    });
    setImagePreviews([]); // Clear image previews after submission
    closeModal();
  };

  const handleImageUploadClick = () => {
    // Trigger a click on the hidden input when the card is clicked
    document.getElementById("fileInput").click();
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
      <div>
        <h2>Your Accommodations</h2>


        <div className="flex flex-wrap gap-4 justify-center">
          {accommodations ? (
            accommodations.accommodations.map((house, index) => (
              <div
                key={index}
                className="max-w-sm w-full rounded overflow-hidden shadow-lg"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`http://localhost:5000/${house.pictures[0]}`}
                  alt={house.title}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{house.title}</div>
                  <p className="text-gray-700 text-base">{house.description}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <p className="text-gray-700 text-base">
                    Price: ${house.price}
                  </p>
                  <p className="text-gray-700 text-base">
                    Location: {house.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading accommodations...</p>
          )}
        </div>
        <div onClick={openModal}>
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
            Add New Accommodation
          </Button>
        </div>
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="overflow-scroll"
        >
          <Box sx={style}>
            <h2>House Form</h2>
            <form onSubmit={handleAddAccommodation}>
              <TextField
                label="Title"
                variant="outlined"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Location"
                variant="outlined"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <input
                type="file"
                id="fileInput"
                name="pictures"
                style={{ display: "none" }}
                onChange={handleImageChange}
                multiple
              />
              <div className="image-previews flex flex-wrap ">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
              ))}
              </div>
              <Card
                sx={{
                  maxWidth: "11rem",
                  height: "15rem",
                  cursor: "pointer",
                }}
                onClick={handleImageUploadClick}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="../../src/images/add-image.png"
                    alt="Add Image"
                  />
                </CardActionArea>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CloudUploadIcon />
                    <Typography component="div">Upload Images</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <TextField
                label="Check-in Time"
                variant="outlined"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Check-out Time"
                variant="outlined"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
            <Button type="button" onClick={closeModal}>
              Close
            </Button>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default AccommodationComponent;
