import React from 'react'
import "./Product.css"
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom'


const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: 2.5,

}

const Product = ({ product }) => {
    return (
        <Link className='productCard' to={product._id}>
            <div className='Card'>
                <img src={product.images[0].url} alt="error" />
                <p> {product.name}</p>
                <div className=''>
                    <ReactStars {...options} />
                    <span> (256 Reviews) </span>
                </div>
                <p>{product.price}</p>
            </div>
        </Link>


    )
}

export default Product
