import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FALUIRE,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERROR
} from "../constant/productConstant"

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
    
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:

            return {
                loading: false,
                products: action.payload.products
            }

        case ALL_PRODUCT_FALUIRE:

            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }

        case CLEAR_ERROR:

            return {
                ...state,
                error: null

            }

        default:
            return state;
    }
}
