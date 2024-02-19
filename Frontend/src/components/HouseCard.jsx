import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { FaMapPin } from "react-icons/fa";
import perks from "../data/perks";
import { useDispatch, useSelector } from "react-redux";

export default function HouseCard(props) {
  const { house, reviews } = props;

  useEffect(() => {
    if (reviews) {
      console.log(reviews);
    }
  }, [reviews]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${house._id}`);
  };

  return (
    <Card
      className="w-full max-w-[25rem] shadow-lg cursor-pointer "
      onClick={handleClick}
    >
      <CardHeader floated={false} color="blue-gray">
        <img
          className="h-full w-full object-cover object-center !h-[15rem] !w-[100%]"
          src={`https://hostia.pp.ua/${house.pictures[0]}`}
          alt="image"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody className="h-[15rem]">
        <div className="mb-3 flex items-center justify-between pb-3">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {house.title}
          </Typography>
          <Tooltip content="Number of guests">
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            {" " + house.numberofguests}
          </Typography>
          </Tooltip>
        </div>
        <Typography color="gray">{house.location}</Typography>
        <Typography color="gray " className="mt-2">
          ${house.price}/ Night
        </Typography>
        <div className="group mt-3 inline-flex flex-wrap items-center gap-3">
          {house.features.slice(0, 3).map((feature, index) => {
            const perk = perks.find((perk) => perk.name === feature);
            return (
              <Tooltip content={perk && perk.name}>
                <span
                  key={feature}
                  className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                >
                  {perk && <perk.icon />}
                </span>
              </Tooltip>
            );
          })}
         
          {house.features.length > 3 && (
            <span className="rounded-full border border-gray-900/5 bg-gray-900/5 p-2 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              +{house.features.length - 3}
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
