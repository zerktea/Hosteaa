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
import { createBookingAsync } from "../slice/bookingSlice";
import { selectUser } from "../slice/userSlice";
import CarouselComponent from "../components/Carousel";
import  ReviewsPerHouse from "../components/ReviewsPerHouse";
import { selectReviews } from "../slice/reviewSlice";
import AccordionComponent from "../components/Accordion";

const AccommodationDetails = () => {
  const { id } = useParams();
 
  
  const [bookingForm, setBookingForm] = React.useState({
    checkIn: dayjs("2023-12-26"),
    checkOut: dayjs("2023-12-27"),
    user: "",
    house: id,
    totalAmount: 0,
  });

  const dispatch = useDispatch();

  const reviews = useSelector(selectReviews);
  const user = useSelector(selectUser);
  const singleAccommodation = useSelector(selectSingleAccommodation);

  const today = new Date();
  const tomorrow = new Date(today);
  const handleForm = async (e) => {
    e.preventDefault();
    const updatedForm = {
      ...bookingForm,
      user: user._id,
      totalAmount:
        Math.abs(bookingForm.checkIn.diff(bookingForm.checkOut, "day")) *
        singleAccommodation.price,
    };

    dispatch(createBookingAsync(updatedForm));
  };
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchAccommodationById(id));
    dispatch(fetchReviewsPerHouse(id));
    console.log("Reviews fetched");
  }, [id, dispatch]);

  if (!singleAccommodation) {
    // Handle loading state, return a loading spinner or message
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-2 p-4 m-8 ">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {singleAccommodation.title}{" "}
      </h1>
      <div className="rounded-3xl ">
        <CarouselComponent images={singleAccommodation.pictures} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] sm:grid-cols-1 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-3xl">
        <div>
          <span className="">
            ${singleAccommodation.price} <span className="text-sm">/night</span>
          </span>
          <div>{singleAccommodation.description}</div>
        </div>
        <div className="p-4 bg-white shadow dark:bg-gray-800 rounded-3xl dark:bg-gray-800 border rounded-lg">
          <form onSubmit={handleForm}>
            <div className="flex flex-col gap-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="form-control">
                  <DatePicker
                    value={bookingForm.checkIn} // Format the Day.js object to a string
                    onChange={(date) =>
                      setBookingForm({ ...bookingForm, checkIn: dayjs(date) })
                    } // Convert the selected date back to a Day.js object
                  />
                </div>
                <div className="form-control">
                  <DatePicker
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
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-end"
                >
                  Book Now
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
        <AccordionComponent reviews={reviews}/>
        
      </div>
    </div>
  );
};

export default AccommodationDetails;
