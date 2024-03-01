import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  selectReviwesChart,
  getReviewsPerBookings,
  selectChartData,
  getusersRoles,
} from "../slice/chartSlice";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PiChart from "../components/PiChart";

export default function Statistics() {
  const [Reviewstats, setdatareviews] = React.useState([]);
  const [userstats, setUserstats] = React.useState([]);

  const dispatch = useDispatch();
  const reviewsChart = useSelector(selectReviwesChart);
  const userRoles = useSelector(selectChartData);
  const [totalUsers,setTotalUsers] = React.useState(0)
  React.useEffect(() => {
    dispatch(getReviewsPerBookings());
    dispatch(getusersRoles());
  }, [dispatch]);
  React.useEffect(() => {
    setdatareviews([
      {
        id: 0,
        value: reviewsChart.bookingnoreview,
        label: `Bookings with no reviews `,
        color: "orange",
      },
      {
        id: 1,
        value: reviewsChart.reviewsPerBooking,
        label: `Bookings with  reviews `,
        color: "pink",
      },
    ]);

    if (userRoles && userRoles.length > 0) {
      setUserstats([
        {
          id: 0,
          value: userRoles[0]?.count || 0,
          label: `${userRoles[0]?.role || "Super Admin"}`,
          color: "orange",
        },
        {
          id: 1,
          value: userRoles[1]?.count || 0,
          label: `${userRoles[1]?.role || "Admin"}`,
          color: "pink",
        },
        {
          id: 2,
          value: userRoles[2]?.count || 0,
          label: `${userRoles[2]?.role || "User"}`,
          color: "purple",
        },
      ]);
    }
    setTotalUsers(userRoles.reduce((total, role) => total + role.count, 0));
  }, [reviewsChart, userRoles]);

  return (
    <div className="grid gap-[3rem] m-8">
      <Typography variant="h3" color="blue-gray" className="text-center ">
        Statistics
      </Typography>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="h-full w-auto  ">
          <CardHeader
            className="mb-4 grid h-28 place-items-center"
            variant="gradient"
            color="gray"
          >
            <Typography variant="h5" >
              Booking reviewed per total booking
            </Typography>
          </CardHeader>
          <CardBody>
            <PiChart
              data={Reviewstats}
              title="Booking reviewed per total booking"
            />
          </CardBody>
          <CardFooter>
            <Typography
              color="blue-gray"
              className="font-bold text-blue-gray-800 text-center font"
            >
              Total Bookings of {reviewsChart.pastbooking}
            </Typography>
          </CardFooter>
        </Card>
        <Card className="h-full w-auto  ">
          <CardHeader
            className="mb-4 grid h-28 place-items-center"
            variant="gradient"
            color="gray"
          >
            <Typography variant="h5" color="">
              User distribution per Role
            </Typography>
          </CardHeader>
          <CardBody>
            <PiChart data={userstats} title="User distribution per Role" />
          </CardBody>
          <CardFooter>
            <Typography
              color="blue-gray"
              className="font-bold text-blue-gray-800 text-center font"
            >
              Total users of{" "} {totalUsers}
             
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
