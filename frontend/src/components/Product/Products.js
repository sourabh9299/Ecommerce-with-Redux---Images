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
    const [CurrentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,25000]);
    const { keyword } = useParams()

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
        console.log(CurrentPage)
    }

const priceHandler =(event,newPrice)=>{
    setPrice(newPrice)
}

    const Alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
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
                    <Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-label='range-slider'
                            min={0}
                            max={25000}
                        />
                    </Typography>
                </div>

                <div className='pagination-box'>
                    <Pagination
                        activePage={CurrentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText=">"
                        prevPageText="<"
                        firstPageText="Home"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>
            </Fragment>}

        </Fragment>
    )
}

export default Products