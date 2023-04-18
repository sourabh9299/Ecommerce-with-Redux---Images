import React from 'react'
import "./Product.css"
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom'




const ProductCard = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
    
    }

    return (
        <Link className='productCard' to={`product/${product._id}`}>
            <div className='Card'>
                <img src={product.images[0].url} alt="error" />
                <p> {product.name}</p>
                <div className=''>
                    <ReactStars {...options} />
                    <span> Reviews({product.numberOfReviews}) </span>
                </div>
                <p>{product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard
