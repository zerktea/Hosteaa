import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAccommodations,
  selectAccommodations,
} from "../slice/accommodationSlice";

export default function GeoChart({ totalhouses }) {
  const [housesData, setHousesData] = useState([]);
  const dispatch = useDispatch();
  // Retrieve all houses from Redux store
  const allHouses = useSelector(selectAccommodations);
  const data = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
  ];

  useEffect(() => {
    // Fetch all accommodations when the component mounts
    dispatch(fetchAllAccommodations());
  }, [dispatch]);

  useEffect(() => {
    if (allHouses) {
      // Count the number of houses in each country
      const countriesMap = {};
      allHouses.accommodations.forEach((house) => {
        const locationParts = house.location.split(", ");
        const country = locationParts[0]; // Extracting the country from the location array
        countriesMap[country] = (countriesMap[country] || 0) + 1;
      });

      // Convert the countries map to the data array format required by the Chart component
      const data = Object.entries(countriesMap).map(([country, count]) => [
        country,
        count,
      ]);

      setHousesData(data);

      // Calculate total number of houses
      let totalHouses = 0;
      Object.values(countriesMap).forEach((count) => (totalHouses += count));
      totalhouses({ target: { value: totalHouses } }); // Send total number of houses back to parent component
    }
  }, [allHouses, totalhouses]);

  return (
    <>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = housesData[selection[0].row + 1]; // Use housesData instead of data
              console.log("Selected : " + region);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={[["Country", "Number of houses"], ...housesData]} // Update data prop to use housesData
      />
    </>
  );
}
