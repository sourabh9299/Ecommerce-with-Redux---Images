import { Fragment, React, useEffect, useState } from 'react'
import { clearError, getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/loader/Loader";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import "./Products.css"


import { useAlert } from "react-alert";
import ProductCard from '../Home/ProductCard';


function Products() {
    const [CurrentPage, setCurrentPage] = useState(1)
    const { keyword } = useParams()

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
        console.log(CurrentPage)
    }

    const Alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, products, productCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
    useEffect(() => {

        dispatch(getProducts(keyword, CurrentPage));
        dispatch(clearError)

    }, [dispatch, Alert, keyword, error, CurrentPage])


    return (

        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className='products-heading'>

                    <h2>Products</h2>
                </div>
                <div className='products'>

                    <div className="products" id="">
                        {products && products.map((product) => <ProductCard product={product} key={product.id} />)}


                    </div>
                </div>

                <div className='Sliderbox'>
                    {/* <Typography>
                        <Slider
                            value={price}
                        />
                    </Typography> */}
                </div>

                <div className='pagination-box'>
                    <Pagination
                        activePage={CurrentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"1st"}
                        lastPageText={"Last"}
                        itemClass='Page-Items'
                        activeClass='page-item-active'
                    />
                </div>
            </Fragment>}

        </Fragment>
    )
}

export default Products