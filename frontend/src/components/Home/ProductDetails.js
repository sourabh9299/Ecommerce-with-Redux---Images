import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./productDetails.css"
import { getProductDetails } from '../../actions/productAction'
import {useSelector,useDispatch} from "react-redux"

const ProductDetails=({match})=> {

const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getProductDetails(match.params.id));
},[dispatch,match.params.id])


    return (
        <Fragment>
            <div className='productDetails'>
                <div>
                <Carousel>
                    hello
                </Carousel>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductDetails