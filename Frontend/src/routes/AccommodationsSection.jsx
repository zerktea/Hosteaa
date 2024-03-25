import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";
import { FaMapPin } from "react-icons/fa";
import {
  addAccommodation,
  fetchAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { CardHeader, CardBody } from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { CardActionArea, CardContent } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import fetchBookingByHouseId from "../slice/bookingSlice";
import selectHouseBookings from "../slice/bookingSlice";
import Stack from "@mui/material/Stack";
import perks from "../data/Perks";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AccommodationComponent = () => {
  const [currentId, setCurrentId] = React.useState("");
  const navigate = useNavigate();
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
    guests: 1,
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [modalIsOpen, setModalIsOpen] = React.useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  function validateAddress(address) {
    // Define the regular expression pattern for the address format

    // Check if the address is empty
    if (!address || typeof address !== "string") {
      return "Address is required";
    }

    // If all checks pass, return an empty string to indicate valid address
    return "";
  }

  const handleChangePerk = (perk) => {
    // Toggle the selected perk
    setSelectedPerks((prevSelectedPerks) => {
      if (prevSelectedPerks.includes(perk)) {
        return prevSelectedPerks.filter(
          (selectedPerk) => selectedPerk !== perk
        );
      } else {
        return [...prevSelectedPerks, perk];
      }
    });
  };

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accommodations = useSelector(selectAccommodations);
  const disabledAccommodations = accommodations?.accommodations.filter(
    (accommodation) => accommodation.disabled
  );
  const activeAccommodations = accommodations?.accommodations.filter(
    (accommodation) => !accommodation.disabled
  );
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
    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding state variable based on the field name
    switch (name) {
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "street":
        setStreet(value);
        break;
        case "houseNumber":
        setHouseNumber(value);
        break;

      case "zipCode":
        setZipCode(value);
        break;
      case "title":
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
      case "description":
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
      case "price":
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
      case "checkInTime":
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
      case "checkOutTime":
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
      case "guests":
        setFormData({
          ...formData,
          [name]: value,
        });
        break;

      default:
        break;
    }

    // Validate the address fields individually
    if (
      name === "country" ||
      name === "city" ||
      name === "street" ||
      name === "houseNumber" ||
      name === "zipCode"
    ) {
      setErrors({
        ...errors,
        location: validateAddress(`${country}, ${city}, ${street}, ${houseNumber}, ${zipCode}`),
      });
    }

    // Validate address field on change
    if (name === "location") {
      setErrors({
        ...errors,
        location: validateAddress(value),
      });
    }
  };

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

    // Validate each address part individually
    const countryError = validateAddress(country);
    const cityError = validateAddress(city);
    const streetError = validateAddress(street);
    const zipCodeError = validateAddress(zipCode);
    const houseNumberError = validateAddress(houseNumber);
    // Check if any address part is invalid
    if (countryError || cityError || streetError|| houseNumberError || zipCodeError) {
      // Set errors for each address part individually
      setErrors({
        country: countryError,
        city: cityError,
        street: streetError,
        zipCode: zipCodeError,
        houseNumber: houseNumberError
      });
      return;
    }

    // Concatenate the address parts into a single string
    const location = `${country}, ${city}, ${street} ${houseNumber}, ${zipCode}`;

    const newHouseData = {
      ...formData,
      location: location,
      owner: user._id,
      features: selectedPerks,
    };
    alert(newHouseData.location);
    dispatch(addAccommodation(newHouseData));

    // Clear the form fields after submission
    setFormData({
      title: "",
      description: "",
      price: "",
      checkInTime: "",
      checkOutTime: "",
      guests: 1,
    });
    setCountry("");
    setCity("");
    setStreet("");
    setHouseNumber("");
    setZipCode("");
    setImagePreviews([]);
    setSelectedPerks([]);
    closeModal();
  };

  const handleImageUploadClick = () => {
    // Trigger a click on the hidden input when the card is clicked
    document.getElementById("fileInput").click();
  };

  const handleRemoveHouse = async () => {
    try {
      // Make an API call to update the disabled field of the house to true
      await axios.put(`https://backtea.onrender.com/api/disableHouses/${currentId}`, {
        disabled: true,
      });

      toast.success("House removed successfully");

      setOpen(false);
      setTimeout(() => {
        window.location.reload(false);
      }, 250);
    } catch (error) {
      console.error("Error removing house:", error);

      toast.error("Failed to remove house");
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
      <div>
        {modalIsOpen ? (
          <>
            <Toaster />
            <h4 className="text-center text-2xl font-bold my-4 ">
              Active Accommodations
            </h4>

            <div className="m-12 flex justify-center items-center">
              <Button
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold rounded"
                onClick={openModal}
              >
                Add New Accommodation
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center m-4">
              {activeAccommodations ? (
                activeAccommodations.map((house, index) => (
                  <div
                    key={index}
                    className="max-w-sm w-full rounded overflow-hidden shadow-lg gap-4 justify-center"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={`https://backtea.onrender.com/${house.pictures[0]}`}
                      alt={house.title}
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {house.title}
                      </div>
                      <p className="text-gray-700 text-base">
                        {house.description}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <p className="text-gray-700 text-base">
                        Price: ${house.price}
                      </p>
                      <div className="px-6 pt-4 pb-2 justify-flex gap-2 flex-row">
                        <span className="text-gray-700 inline-block ">
                          <FaMapPin />
                        </span>
                        <p className="text-gray-700  inline-block ">
                          {house.location}
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-4 grid grid-cols-2 gap-2 ">
                        <Button
                          className=" inline-block mr-2 p-2 "
                          color="blue"
                          onClick={() => navigate(`/edithouse/${house._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="ml-2   inline-block p-2 "
                          color="red"
                          onClick={() => {
                            handleOpen();
                            setCurrentId(house._id);
                          }}
                        >
                          Remove
                        </Button>

                        <Dialog open={open} handler={handleOpen}>
                          <DialogHeader>Long Dialog</DialogHeader>
                          <DialogBody>
                            <Typography className="font-normal">
                              Are you sure you want to remove this house? Once
                              removed, it will no longer appear in the search
                              menu and will be disabled for a while.
                            </Typography>
                          </DialogBody>
                          <DialogFooter className="space-x-2">
                            <Button
                              variant="text"
                              color="blue-gray"
                              onClick={handleOpen}
                            >
                              cancel
                            </Button>
                            <Button
                              variant="gradient"
                              color="red"
                              onClick={() => {
                                handleOpen();
                                handleRemoveHouse();
                              }}
                            >
                              Remove
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No active accommodations</p>
              )}
            </div>
            <div>
              <hr className="my-8 border-blue-gray-500 w-full " />
              <h4 className="text-center text-2xl font-bold my-4 mt-20">
                Disabled Accommodations
              </h4>
            </div>
            <div className="flex flex-wrap gap-4 justify-center m-4">
              {disabledAccommodations ? (
                disabledAccommodations.map((house, index) => (
                  <div
                    key={index}
                    className="max-w-sm w-full rounded overflow-hidden shadow-lg gap-4 justify-center"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={`https://backtea.onrender.com/${house.pictures[0]}`}
                      alt={house.title}
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {house.title}
                      </div>
                      <p className="text-gray-700 text-base">
                        {house.description}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <p className="text-gray-700 text-base">
                        Price: ${house.price}
                      </p>
                      <div className="px-6 pt-4 pb-2 justify-flex gap-2 flex-row">
                        <span className="text-gray-700 inline-block ">
                          <FaMapPin />
                        </span>
                        <p className="text-gray-700  inline-block ">
                          {house.location}
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-4 grid grid-cols-2 gap-2 ">
                        <Button
                          disabled
                          className=" inline-block mr-2 p-2 "
                          color="blue"
                          onClick={() => navigate(`/edithouse/${house._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          disabled
                          className="ml-2   inline-block p-2 "
                          color="red"
                          onClick={() => {
                            handleOpen();
                            setCurrentId(house._id);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Inactive accommodations</p>
              )}
            </div>
          </>
        ) : (
          <div>
            <div className="m-4 flex  content-start">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-6 font-medium hover:underline hover:cursor-pointer flex "
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </Typography>
            </div>
            <div
              onClick={modalIsOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className=""
            >
              <div className="modal-content">
                <h2>House Form</h2>
                <form
                  onSubmit={handleAddAccommodation}
                  className="form flex flex-col max-w-lg  items-center"
                >
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
                    label="Country"
                    variant="outlined"
                    name="country"
                    value={country}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.country}
                    helperText={errors.country}
                  />
                  <TextField
                    label="City"
                    variant="outlined"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                  <div className="grid grid-cols-[2fr_1fr] gap-4">
                    <TextField
                      label="Street"
                      variant="outlined"
                      name="street"
                      value={street}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      required
                      error={!!errors.street}
                      helperText={errors.street}
                      className=" "
                    />
                    <TextField
                      label="House number*/Apt"
                      variant="outlined"
                      name="houseNumber"
                      value={houseNumber}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      required
                      error={!!errors.houseNumber}
                      helperText={errors.houseNumber}
                    />
                  </div>
                  <TextField
                    label="Zip Code"
                    variant="outlined"
                    type="number"
                    name="zipCode"
                    value={zipCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.zipCode}
                    helperText={errors.zipCode}
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
                    className=" bg-gray-100 roundedhover:cursor-pointer m-6"
                    onClick={handleImageUploadClick}
                  >
                    <CardContent className="text-center allign-center flex justify-center items-center hover:cursor-pointer">
                      <Stack
                        direction="row"
                        alignItems="center"
                        className="text-center"
                        gap={1}
                      >
                        <CloudUploadIcon />
                        <Typography component="div" className="text-center">
                          Upload Images
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                  <div>
                    <h2 className="text-lg mb-4 text-center mt-4 mb-4 text-gray-700  ">
                      Select Perk
                    </h2>

                    <Card className="w-full flex flex-wrap">
                      <List className="flex-row flex-wrap">
                        {perks.map((perk, index) => (
                          <Tooltip content={perk.name}>
                            <div key={index}>
                              <ListItem className="p-0">
                                <label
                                  htmlFor={`perk-checkbox-${index}`}
                                  className="flex cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id={`perk-checkbox-${index}`}
                                      checked={selectedPerks.includes(
                                        perk.name
                                      )}
                                      onChange={() =>
                                        handleChangePerk(perk.name)
                                      }
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    <perk.icon />
                                  </Typography>
                                </label>
                              </ListItem>
                            </div>
                          </Tooltip>
                        ))}
                      </List>
                    </Card>
                  </div>
                  <label
                    for="bedrooms-input"
                    className="block mb-2 text-lg text-gray-700 dark:text-white"
                  >
                    Number of guests
                  </label>
                  <div className="relative flex items-center max-w-[11rem]">
                    <button
                      type="button"
                      id="decrement-button"
                      onClick={() => {
                        if (formData.guests > 1) {
                          setFormData({
                            ...formData,
                            guests: formData.guests - 1,
                          });
                        }
                      }}
                      data-input-counter-decrement="bedrooms-input"
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="guests"
                      name="guests"
                      data-input-counter
                      data-input-counter-min="1"
                      data-input-counter-max="30"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      onChange={handleChange}
                      value={formData.guests}
                      required
                    />
                    <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                      <span>Guests</span>
                    </div>
                    <button
                      type="button"
                      id="increment-button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          guests: formData.guests + 1,
                        })
                      }
                      data-input-counter-increment="bedrooms-input"
                      class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        class="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
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
                  <Button
                    type="submit"
                    variant="contained"
                    className="w-[50%] bg-orange-400 mt-4 justify-center"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};

export default AccommodationComponent;
