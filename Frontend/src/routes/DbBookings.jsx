// Contact.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
 
  Typography,
 
} from "@material-tailwind/react";
import dayjs from "dayjs";
import {
  fetchAllAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";
const TABLE_HEAD = ["Owner", "In-Out Time","Location", "Title", "CreatedAt", "Action"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
const DbBookings = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);

  useEffect(() => {
    // Fetch all accommodations when the component mounts
    dispatch(fetchAllAccommodations());
  }, [dispatch]);
console.log(accommodations.accommodations);

  return (<div className="flex flex-col gap-4 m-8">
    <Typography variant="h3" color="blue-gray">
      Bookings
    </Typography>
    <Card className="h-full w-full overflow-scroll ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accommodations.accommodations.map(({_id,owner,checkInTime,checkOutTime,location,title ,createdAt}, index) => (
           <tr key={_id} className="even:bg-blue-gray-50 ">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {owner.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {checkInTime+"-"+checkOutTime}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {location}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {dayjs(createdAt).format("DD/MM/YYYY")} 
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {dayjs(createdAt).format("DD/MM/YYYY")} 
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </div>
  );
};

export default DbBookings;
