import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";

import HouseCard from "../components/HouseCard";
("use client");

const Home = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);

  useEffect(() => {
    // Fetch all accommodations when the component mounts
    dispatch(fetchAllAccommodations());
  }, [dispatch]);

  return (
    <div>
      <h2>Welcome to the Home component</h2>

      <div className=" grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4 sm:p-8 ">
        {accommodations.accommodations.length === 0 && (
          <p>No accommodations found.</p>
        )}
        {accommodations.accommodations.map((accommodation) => (
          <HouseCard key={accommodation._id} house={accommodation} />
        ))}
        
      </div>
    </div>
  );
};

export default Home;
