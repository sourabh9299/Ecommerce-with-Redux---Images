import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom';
import "./productDetails.css"
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from '../../actions/productAction'
import ReviewCard from './ReviewCard.js'



const ProductDetails = () => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: 2.5,
        size: 18
    }

    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.productDetail)
    console.log(product)

    function scrool() {

        window.scrollTo(0, 0)

    }

    useEffect(() => {

        dispatch(getProductDetails(id));

    }, [dispatch, id])



    return (
        <Fragment>
            {window.scrollTo()}
            <div className='productDetails'>

                <div className='detailsblock-1'>
                    <Carousel>
                        {product.images && product.images.map((item, i) =>
                            <div>

                                <img
                                    key={item.url}
                                    src={item.url}
                                    alt={item.url}
                                />


                            </div>

                        )}
                    </Carousel>
                </div>

                <div className='detailsblock-2'>

                    <div className='detailsblock-2-1'>
                        <h1>
                            {product.name}
                        </h1>
                        <p>
                            Product # {product._id}
                        </p>
                    </div>

                    <div className='detailsblock-2-2'>

                        <h2>
                            {"₹ " + product.price}
                        </h2>
                        <div>
                            <p >
                                Status :
                                <span className={product.stock >= 1 ? "greenColor" : "redColor"}>
                                    {product.stock >= 1 ? "Available" : "Out of Stock"}
                                </span>
                            </p>
                        </div>

                        <ReactStars {...options} />
                    </div>

                    <div className='detailsblock-2-3'>

                        <div>
                            <button>
                                -
                            </button>
                            <input type='number'></input>
                            <button>
                                +
                            </button>
                        </div>

                        <div>
                            <button>
                                Add to cart
                            </button>
                        </div>

                    </div>

                    <div>
                        <h3>
                        description:
                        </h3>
                        <p>
                            {product.description}
                        </p>
                    </div>

                </div>

            </div>

            {scrool()}
    <div>
        {product.reviews.map((review)=>{
            <ReviewCard review={review} />
        })}
    </div>



        </Fragment>
    )

}

export default ProductDetails