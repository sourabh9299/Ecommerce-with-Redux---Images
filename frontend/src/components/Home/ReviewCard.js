import React from 'react'
import avtar from "../layout/images/img_avatar.png"
import "./review.css"
import ReactStars from "react-rating-stars-component"


const ReviewCard = ({ reviews }) => {
  console.log(reviews)

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
  }

  return (
    <>
      <div className='ReviewBox'>
        <img
          src={avtar}
          alt="not found" />
        <div>

          User:  {reviews.name}
        </div>
        <div>
          {reviews.comment}

        </div>
        <div>
          <ReactStars options={options} value={reviews.rating} />
        </div>
        <div></div>

      </div>

      


    </>
  )
}

export default ReviewCard