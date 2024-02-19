import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccommodationById,
  selectSingleAccommodation,
} from "../slice/accommodationSlice";
import { fetchReviewsPerHouse } from "../slice/reviewSlice";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  createBookingAsync,
  fetchBookingByHouseId,
} from "../slice/bookingSlice";
import { selectUser } from "../slice/userSlice";
import CarouselComponent from "../components/Carousel";
import ReviewsPerHouse from "../components/ReviewsPerHouse";
import { selectReviews } from "../slice/reviewSlice";
import AccordionComponent from "../components/Accordion";
import Payment from "../components/Payment";
import { selectHouseBookings } from "../slice/bookingSlice";
import toast, { Toaster } from "react-hot-toast";
import HouseCard from "../components/HouseCard";
import { Avatar, Typography } from "@material-tailwind/react";

const AccommodationDetails = () => {
  const [showPayment, setShowPayment] = React.useState(false);
  const { id } = useParams();
  const today = new Date();
  const tomorrow = new Date(today);
  const [bookingForm, setBookingForm] = React.useState({
    checkIn: dayjs(today),
    checkOut: dayjs(tomorrow),
    user: "",
    house: id,
    totalAmount: 0,
  });

  const dispatch = useDispatch();

  const reviews = useSelector(selectReviews);
  const user = useSelector(selectUser);
  const singleAccommodation = useSelector(selectSingleAccommodation);
  const bookings = useSelector(selectHouseBookings);
  console.log(bookings);

  const handleForm = async (e) => {
    e.preventDefault();
    const updatedForm = {
      ...bookingForm,
      user: user._id,
      totalAmount:
        Math.abs(bookingForm.checkIn.diff(bookingForm.checkOut, "day")) *
        singleAccommodation.price,
    };
    setShowPayment(true);
  };
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchAccommodationById(id));
    dispatch(fetchReviewsPerHouse(id));
    dispatch(fetchBookingByHouseId(id));
  }, [id, dispatch]);

  function disabledDate(date) {
    // Check if the date is disabled based on the bookings
    for (const booking of bookings) {
      if (
        (dayjs(date).isSame(dayjs(booking.checkInDate)) ||
          dayjs(date).isAfter(dayjs(booking.checkInDate))) &&
        (dayjs(date).isBefore(dayjs(booking.checkOutDate)) ||
          dayjs(date).isSame(dayjs(booking.checkOutDate)))
      ) {
        // If the date is within a booking range, it should be disabled
        return true;
      }
    }

    // If the date is not within any booking range, it should not be disabled
    return false;
  }
  const handleLocation = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${singleAccommodation.location}`,
      "_blank"
    );
  };
  if (!singleAccommodation) {
    // Handle loading state, return a loading spinner or message
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <Toaster />
      </div>
      {showPayment ? (
        <div>
          <div
            className="flex  gap-4 p-4 m-8 text-l  text-gray-600 dark:text-white underline hover:cursor-pointer"
            onClick={() => setShowPayment(false)}
          >
            Back to Accommodation
          </div>

          <div className="flex flex-col gap-2 p-4 m-8 md:grid md:grid-cols-2 md:gap-4 md:p-8 md:align-center place-items-center">
            <div className="flex align-center ">
              <Payment
                bookingForm={{
                  ...bookingForm,
                  user: user._id,
                  totalAmount:
                    Math.abs(
                      bookingForm.checkIn.diff(bookingForm.checkOut, "day")
                    ) * singleAccommodation.price,
                }}
                handlePayment={() => setShowPayment(false)}
              />
            </div>
            <div className="flex flex-col gap-4 align-center justify-center gap-6">
              <div>
                <HouseCard house={singleAccommodation} />
              </div>
              <div className="flex flex-col gap-2 align-center justify-center text-lg text-center">
                {singleAccommodation.price} per night -{" "}
                {Math.abs(
                  bookingForm.checkIn.diff(bookingForm.checkOut, "day")
                )}{" "}
                night(s) for
                <span className="font-bold text-xl text-gray-500 ml-2 underline">
                  $
                  {Math.abs(
                    bookingForm.checkIn.diff(bookingForm.checkOut, "day")
                  ) * singleAccommodation.price}
                </span>
                <Typography className="text-lg">
                  <span className="text-sm">
                    From{" "}
                    <Typography className="text text-gray-500 underline hover:cursor-pointer">
                      {dayjs(bookingForm.checkIn).format("DD/MM/YYYY")}{" "}
                    </Typography>
                    to{" "}
                    <Typography className="text text-gray-500 underline hover:cursor-pointer">
                      {dayjs(bookingForm.checkOut).format("DD/MM/YYYY")}
                    </Typography>
                  </span>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4 m-8 ">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {singleAccommodation.title}{" "}
          </h1>
          <Typography
            variant="a"
            color="gray"
            className="text-sm hover:cursor-pointer underline flex flex-row gap-2 justify-start align-center"
            onClick={handleLocation}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
              {singleAccommodation.location}
            </svg>
            {singleAccommodation.location}
          </Typography>
          <div className="rounded-3xl ">
            <CarouselComponent images={singleAccommodation.pictures} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] sm:grid-cols-1 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-3xl">
            <div className="p-4 bg-white shadow dark:bg-gray-800 rounded-3xl dark:bg-gray-800 border rounded-lg">
              <div>
                <span className="">
                  ${singleAccommodation.price}{" "}
                  <span className="text-sm">/night</span>
                </span>{" "}
                <span>
                  <Typography className="text-sm text-gray-500">
                    Max number of guests: {singleAccommodation.numberofguests}
                  </Typography>
                </span>
              </div>
              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="owner flex flex-row gap-2">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={
                      `https://hostia.pp.ua/${singleAccommodation.owner.profilePic}` ||
                      null
                    }
                    alt="avatar"
                  />
                  <div>
                    <Typography variant="h6">
                      {singleAccommodation.owner.name}{" "}
                      {singleAccommodation.owner.surename}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {singleAccommodation.owner.email}{" "}
                    </Typography>
                  </div>
                </div>
              </div>
              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div>{singleAccommodation.description}</div>
              <br />
            </div>
            <div className="p-4 bg-white shadow dark:bg-gray-800 rounded-3xl dark:bg-gray-800 border rounded-lg">
              <form onSubmit={handleForm}>
                <div className="flex flex-col gap-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="form-control">
                      <DatePicker
                        disablePast
                        shouldDisableDate={disabledDate}
                        value={bookingForm.checkIn} // Format the Day.js object to a string
                        onChange={(date) =>
                          setBookingForm({
                            ...bookingForm,
                            checkIn: dayjs(date),
                          })
                        } // Convert the selected date back to a Day.js object
                      />
                    </div>
                    <div className="form-control">
                      <DatePicker
                        shouldDisableDate={disabledDate}
                        disablePast
                        value={bookingForm.checkOut} // Format the Day.js object to a string
                        onChange={(date) =>
                          setBookingForm({
                            ...bookingForm,
                            checkOut: dayjs(date),
                            totalAmount:
                              Math.abs(
                                bookingForm.checkIn.diff(
                                  bookingForm.checkOut,
                                  "day"
                                )
                              ) * singleAccommodation.price,
                          })
                        } // Convert the selected date back to a Day.js object
                      />
                    </div>
                  </LocalizationProvider>
                  <div className="form-control grid grid-cols-2 gap-4">
                    <span className="">
                      {singleAccommodation.price}${" "}
                      <span className="text-sm">/night</span>
                    </span>
                    <span className="justify-self-end">
                      {singleAccommodation.price *
                        Math.abs(
                          bookingForm.checkIn.diff(bookingForm.checkOut, "day")
                        )}
                      $ for{" "}
                      {Math.abs(
                        bookingForm.checkIn.diff(bookingForm.checkOut, "day")
                      )}
                      <span className="text-sm">
                        {" "}
                        Night
                        {Math.abs(
                          bookingForm.checkIn.diff(bookingForm.checkOut, "day")
                        ) > 1
                          ? "s"
                          : ""}
                      </span>
                    </span>
                  </div>

                  <div className="form-control mt-6 flex justify-center">
                    <button
                      class="px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20 bg-orange-400 text-white font-sans hover:text-gray-800"
                      type="button"
                      onClick={handleForm}
                      disabled={
                        Math.abs(
                          bookingForm.checkIn.diff(bookingForm.checkOut, "day")
                        ) < 1
                      }
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="clicktoexpand">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Reviews
              </h1>
            </div>
          </div>
          <div className="p-4 reviews">
            <AccordionComponent reviews={reviews} />
          </div>
        </div>
      )}
    </>
  );
};

export default AccommodationDetails;
