import axios from "axios";

import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FALUIRE,
    PRODUCT_DETAILED_REQUEST,
    PRODUCT_DETAILED_SUCCESS,
    PRODUCT_DETAILED_FALUIRE,
    CLEAR_ERROR,
} from "../constant/productConstant.js";

export const getProducts=()=> async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST})
        const {data} = await axios.get("/api1/products");

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });



    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FALUIRE,
            payload: {
                error: error.message,
              }
        })
    }
}

export const getProductDetails=(id)=> async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILED_REQUEST})
        const {data} = await axios.get(`/api1/product/${id}`);
        

        dispatch({
            type:PRODUCT_DETAILED_SUCCESS,
            payload:data.product
        });



    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILED_FALUIRE,
            payload: {
                error: error.message,
              }
        })
    }
}

export const clearError=()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERROR})
}






