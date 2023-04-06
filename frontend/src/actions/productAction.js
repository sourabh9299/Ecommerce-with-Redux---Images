import axios from "axios";

import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FALUIRE,
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
            payload:error.response.data.message
        })
    }
}

export const clearError=()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERROR})
}






