import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";
import { fetchReviewsPerHouse, selectReviews } from "../slice/reviewSlice";

import HouseCard from "../components/HouseCard";

const Home = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);
  const [reviewsMap, setReviewsMap] = useState({});

  useEffect(() => {
    // Fetch all accommodations when the component mounts
    dispatch(fetchAllAccommodations());
  }, [dispatch]);

  useEffect(() => {
    // Check if accommodations is defined before fetching reviews
    if (accommodations && accommodations.accommodations) {
      const fetchReviews = async () => {
        const promises = accommodations.accommodations.map(async (accommodation) => {
          const reviews = await dispatch(fetchReviewsPerHouse(accommodation._id));
          return { [accommodation._id]: reviews };
        });

        const results = await Promise.all(promises);
        const updatedReviewsMap = results.reduce((acc, result) => ({ ...acc, ...result }), {});
        setReviewsMap(updatedReviewsMap);
      };

      fetchReviews();
    }
  }, [accommodations, dispatch]);

  // Check if accommodations is defined before filtering
  const filteredAccommodations = accommodations && accommodations.accommodations
    ? accommodations.accommodations.filter(
        (accommodation) =>
          accommodation.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4 sm:p-8">
        {filteredAccommodations.length === 0 && (
          <p>No accommodations found.</p>
        )}
        {filteredAccommodations.map((accommodation) => (
          <HouseCard
            key={accommodation._id}
            house={accommodation}
            review={reviewsMap[accommodation._id] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
