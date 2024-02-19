// Contact.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Chip ,
  Typography,
 
} from "@material-tailwind/react";
import dayjs from "dayjs";
import {
  fetchAllAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";
import { fetchAllBookings,selectallBookings } from "../slice/bookingSlice";
const TABLE_HEAD = ["User", "Number of days","Title", "Owner", "Status","Total Price","Action"];
 

const DbBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectallBookings);

  useEffect(() => {
    // Fetch all accommodations when the component mounts
    dispatch(fetchAllBookings());
    
  }, [dispatch]);
 

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
          {bookings.map(({_id,house,owner,user,checkInDate,checkOutDate,location,title,totalAmount}, index) => (
           <tr key={_id} className="even:bg-blue-gray-50 ">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {user.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {dayjs(checkOutDate).diff(dayjs(checkInDate), 'day')}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {house.title}
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
                  {house.owner.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium width-20"
                >
                 {dayjs(checkOutDate).isBefore(dayjs()) ? <Chip color="green" className="font-medium text-center " value="Past" /> : <Chip className="font-medium text-center "  color="amber" value="Booked" />}
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
                 $ {totalAmount}
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
