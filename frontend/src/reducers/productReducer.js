import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FALUIRE,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILED_REQUEST,
    PRODUCT_DETAILED_SUCCESS,
    PRODUCT_DETAILED_FALUIRE,
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
                products: action.payload.products,
                productsCount: action.payload.productsCount

            }

        case ALL_PRODUCT_FALUIRE:
            return {
                loading: false,
                error: action.payload.error,
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

// Detail Products
export const productDetailedReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILED_REQUEST:
            return {
                loading: true,
                ...state
            }

        case PRODUCT_DETAILED_SUCCESS:
            return {
                loading: false,
                product: action.payload
                
            }

        case PRODUCT_DETAILED_FALUIRE:
            return {
                loading: false,
                error: action.payload.error,
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
