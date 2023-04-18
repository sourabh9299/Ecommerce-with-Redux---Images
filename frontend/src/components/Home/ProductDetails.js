import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom';
import "./productDetails.css"
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from "react-redux"
import { clearError, getProductDetails } from '../../actions/productAction'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/loader/Loader';
import { useAlert } from "react-alert";



const ProductDetails = () => {

   
    const alert = useAlert()
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading,error,product  } = useSelector(state => state.productDetail)

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        size: 18
    }

    function scrool() {

        window.scrollTo(0, 0)

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getProductDetails(id));
        

    }, [dispatch, id,error,alert])



    return (
        <Fragment>
            {loading ? <Loader /> :
             <Fragment>
                {window.scrollTo()}
                <div className='productDetails'>

                    <div className='detailsblock-1'>
                        <Carousel arrow={false}>
                            {product.images && product.images.map((item, i) =>
                                <div className='img-box'>

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
                    <h1 className='Review-heading'>
                        Reviews
                    </h1>
                </div>
                <div>
                    {product.reviews && product.reviews[0] ? (
                        <div className='Reviews'>
                            {product.reviews.map((review) => 
                               
                               <ReviewCard reviews={review} />
                               )}
                        </div>
                    ) : <div>
                        No Reviews
                    </div>}

                    {/* {product.reviews[0].comment} */}
                </div>



            </Fragment>}
        </Fragment>
    )

}

export default ProductDetails