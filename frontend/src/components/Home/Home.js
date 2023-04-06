import React, { useEffect } from "react";
import "../Home/home.css"
import { FaMouse } from "react-icons/fa"
import Product from "./Product";
import "../Home/Product.css"
import MetaDeta from "../layout/MetaDeta";
import { getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/loader/Loader";




function Home() {
   const dispatch = useDispatch()

      const{loading,error,products,productsCount} = useSelector(state=>state.products);
      

      useEffect(() => {
      dispatch(getProducts());

   }, [dispatch])

   return (
      <>
      {loading? <Loader />:<>
         <MetaDeta title="Khilonaghar" />
         <div className="Banner">
            <p>Welcome to KhilonaGhar</p>
            <h2>Find And Order Quality and priceEffective Products</h2>

            <a href="#productContainer">
               <button>
                  <p> Scroll <FaMouse /></p>
               </button>
            </a>
         </div>

         <h2 className="homeHeadingText">
            Featured Products
         </h2>
         <div className="productContainer" id="productContainer">
            {products && products.map((product)=><Product product={product} />)}
           
         </div>
      </>}
      </>

   )
}

export default Home