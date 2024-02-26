import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";
import { fetchReviewsPerHouse, selectReviews } from "../slice/reviewSlice";
import perks from "../data/Perks";
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
import HouseCard from "../components/HouseCard";

const Home = ({ searchTerm,numberofGuests }) => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);
  const [reviewsMap, setReviewsMap] = useState({});
  const [selectedPerks, setSelectedPerks] = useState([]);

  useEffect(() => {
    // Fetch all accommodations when the component mounts
    dispatch(fetchAllAccommodations());
  }, [dispatch]);

  useEffect(() => {
    // Check if accommodations is defined before fetching reviews
    if (accommodations && accommodations.accommodations) {
      const fetchReviews = async () => {
        const promises = accommodations.accommodations.map(
          async (accommodation) => {
            const reviews = await dispatch(
              fetchReviewsPerHouse(accommodation._id)
            );
            return { [accommodation._id]: reviews };
          }
        );

        const results = await Promise.all(promises);
        const updatedReviewsMap = results.reduce(
          (acc, result) => ({ ...acc, ...result }),
          {}
        );
        setReviewsMap(updatedReviewsMap);
      };

      fetchReviews();
    }
  }, [accommodations, dispatch]);

  const filteredAccommodations = accommodations && accommodations.accommodations
    ? accommodations.accommodations.filter(accommodation =>
        selectedPerks.every(perk =>
          accommodation.features.includes(perk)
        ) &&
        accommodation.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        accommodation.numberofguests >= numberofGuests // Add this condition
      )
    : [];

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

  return (
    <div>
      <Card className="w-full flex flex-wrap">
        <List className="flex-row flex-wrap">
          {perks.map((perk, index) => (
            <Tooltip content={perk.name} key={index}>
              <div>
                <ListItem className="p-0">
                  <label
                    htmlFor={`perk-checkbox-${index}`}
                    className="flex cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id={`perk-checkbox-${index}`}
                        checked={selectedPerks.includes(perk.name)}
                        onChange={() => handleChangePerk(perk.name)}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      <perk.icon />
                    </Typography>
                  </label>
                </ListItem>
              </div>
            </Tooltip>
          ))}
        </List>
      </Card>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4 sm:p-8">
        {filteredAccommodations.length === 0 && <p>No accommodations found.</p>}
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