import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import ReviewsPerHouse from "./ReviewsPerHouse";
function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

export default function AccordionComponent(props) {
    const { reviews } = props
    const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
         Check the reviews of this house ({reviews.length})
        </AccordionHeader>
        <AccordionBody>
         <ReviewsPerHouse  reviews={reviews} />
        </AccordionBody>
      </Accordion>
    </>
  );
}
