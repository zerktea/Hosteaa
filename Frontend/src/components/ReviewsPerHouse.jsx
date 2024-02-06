import React from "react";
import { Typography, Avatar, Rating } from "@material-tailwind/react";

export default function ReviewsPerHouse(props) {
    const { reviews } = props;
    console.log(reviews);
    return (
        <div className="reviews-per-house">
            {reviews.reviews.map((review) => (
                 <div className="px-8 text-center mb-12 card shadow-sm shadow-blue-gray" key={review._id}>
                 <Typography variant="h4" color="blue-gray" className="mb-6 font-medium">
                   &quot;{review.comment}&quot;
                 </Typography>
                 <Avatar
                   src={`http://localhost:5000/${review.userDetails.profilePic}`}
                   alt="image"
                   size="lg"
                 />
                 <Typography variant="h6" className="mt-4">
                   {review.userDetails.name} - {review.userDetails.surename}
                 </Typography>
                 
                 <Rating value={review.rating} readonly  unratedColor="amber" ratedColor="amber" />
               </div>
            ))}
        </div>
    );
    
}
