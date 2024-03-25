// BookingsSection.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsAsync, selectBookings } from "../slice/bookingSlice";
import { selectUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Modal } from "flowbite-react";
import { Label, Textarea } from "flowbite-react";
import { Rating } from "@material-tailwind/react";
import { addReview } from "../slice/reviewSlice";
import selectReviews from "../slice/reviewSlice";
import { fetchReviewsPerUser } from "../slice/reviewSlice";
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

const BookingsSection = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [upcommingBookings, setUpcommingBookings] = React.useState([]);
  const [pastBookings, setPastBookings] = React.useState([]);
  const [currentId, setCurrentId] = React.useState("");
  const [rating, setRated] = React.useState({
    rated: 1,
    comment: "",
    user: "",
    booking: "",
  });

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const bookings = useSelector(selectBookings);
  const reviews = useSelector((state) => state.reviews.reviews);
  const navigate = useNavigate();
  console.log(reviews);
  useEffect(() => {
    if (user) {
      dispatch(fetchBookingsAsync(user._id));
      dispatch(fetchReviewsPerUser(user._id));
    }
  }, [dispatch, user]);

  const onNavigate = (e) => {
    navigate(`/${e}`);
  };
  function handlerating(bookingId) {
    console.log(bookingId);
    const formToSend = {
      rating: rating.rated,
      comment: rating.comment,
      user: user._id,
      booking: currentId,
    };

    dispatch(addReview(formToSend));
    setRated({
      rated: 1,
      comment: "",
      user: "",
      booking: "",
    });
    setOpenModal(false);
  }
  useEffect(() => {
    if (bookings) {
      const upcomming = bookings.filter(
        (booking) =>
          dayjs(booking.checkInDate).format("YYYY-MM-DD") >=
          dayjs().format("YYYY-MM-DD")
      );
      const past = bookings.filter(
        (booking) =>
          dayjs(booking.checkInDate).format("YYYY-MM-DD") <
          dayjs().format("YYYY-MM-DD")
      );
      setUpcommingBookings(upcomming);
      setPastBookings(past);
    }
  }, [bookings]);

  return (
    <div className="grid gap-6 justify-center mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-xl font-bold">Bookings Section</h2>
      <div>
        <h3 className="text-xl font-bold mb-4">Upcoming Bookings</h3>
        {upcommingBookings.length > 0 ? (
          upcommingBookings.map((booking) => (
            <div
              key={booking._id}
              className="w-500  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 p-4"
            >
              <Card className="w-full max-w-[48rem] flex-row ">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-2/5 shrink-0 rounded-r-none"
                >
                  <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:w-full md:flex-row p-8">
                    <img
                     
                      src={`https://backtea.onrender.com/${booking.house.pictures[0]}`}
                      alt=""
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col justify-start p-6">
                    <h5
                      className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50 cursor-pointer"
                      onClick={() => onNavigate(booking.house._id)}
                    >
                      {booking.house.title}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      {booking.house.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">
                      <span className="font-bold text-green-600">
                        {dayjs(booking.checkInDate).format("YYYY-MM-DD")}
                      </span>{" "}
                      at {booking.house.checkInTime}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">
                      <span className="font-bold text-green-600">
                        {dayjs(booking.checkOutDate).format("YYYY-MM-DD")}
                      </span>{" "}
                      at {booking.house.checkOutTime}
                    </p>
                    <p>
                      Total Amount:{" "}
                      <span className="font-bold text-green-600">
                        {booking.totalAmount}
                      </span>
                    </p>
                    {/* Add more details as needed */}
                    <p>Owner: {booking.house.owner.name}</p>
                    <p>Location: {booking.house.location}</p>

                   
                    
                  </div>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center text-xl gray-900  mb-4">
            No upcoming bookings
          </p>
        )}

        <h3 className="text-xl font-bold mb-4">Past Bookings</h3>
        {pastBookings.length > 0 ? (
          pastBookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 m-4"
            >
              <Card className="w-full max-w-[48rem] flex-row ">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-2/5 shrink-0 rounded-r-none"
                >
                  <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:w-full md:flex-row p-8">
                    <img
                     
                      src={`https://backtea.onrender.com/${booking.house.pictures[0]}`}
                      alt=""
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col justify-start p-6">
                    <h5
                      className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50 cursor-pointer"
                      onClick={() => onNavigate(booking.house._id)}
                    >
                      {booking.house.title}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      {booking.house.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">
                      <span className="font-bold text-green-600">
                        {dayjs(booking.checkInDate).format("YYYY-MM-DD")}
                      </span>{" "}
                      at {booking.house.checkInTime}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">
                      <span className="font-bold text-green-600">
                        {dayjs(booking.checkOutDate).format("YYYY-MM-DD")}
                      </span>{" "}
                      at {booking.house.checkOutTime}
                    </p>
                    <p>
                      Total Amount:{" "}
                      <span className="font-bold text-green-600">
                        {booking.totalAmount}
                      </span>
                    </p>
                    {/* Add more details as needed */}
                    <p>Owner: {booking.house.owner.name}</p>
                    <p>Location: {booking.house.location}</p>

                    {reviews.filter((review) => review.booking === booking._id)
                      .length === 0 && (
                      <Button
                        className="mt-4"
                        onClick={() => {
                          setOpenModal(true);
                          setCurrentId(booking._id);
                        }}
                      >
                        Review your stay
                      </Button>
                    )}
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                      <Modal.Header>Rating {currentId}</Modal.Header>
                      <Modal.Body>
                        <div className="space-y-6">
                          <div className="max-w-md">
                            <div className="mb-2 block">
                              <Label htmlFor="comment" value="Your message" />
                            </div>
                            <Textarea
                              id="comment"
                              placeholder="Leave a comment..."
                              required
                              rows={4}
                              value={rating.comment}
                              onChange={(e) =>
                                setRated({
                                  ...rating,
                                  comment: e.target.value,
                                })
                              }
                            />
                          </div>

                          <Rating
                            value={rating.rated}
                            onChange={(value) =>
                              setRated({ ...rating, rated: value })
                            }
                          />
                          {rating.rated > 0 && (
                            <p className="text-sm text-gray-500">
                              You rated {rating.rated} out of 5
                            </p>
                          )}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => handlerating(booking._id)}>
                          Send
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setOpenModal(false)}
                        >
                          Decline
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center text-xl gray-900  mb-4">No past bookings</p>
        )}
      </div>
    </div>
  );
};

export default BookingsSection;
