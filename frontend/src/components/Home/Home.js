import React, { useEffect } from "react";
import "../Home/home.css"
import { FaMouse } from "react-icons/fa"
import Product from "./Product";
import "../Home/Product.css"
import MetaDeta from "../layout/MetaDeta";
import { getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux"


const product = {
   _id: "Sourabh",
   name: "sourabh",
   Age: 22,
   address: "Delhi",
   price: "Rs.1000",
   Qualification: 12,
   images: [{ url: "https://www.w3schools.com/howto/img_avatar.png" }]
};

function Home() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getProducts());

   }, [dispatch])

   return (
      <>
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
            <Product className="Forproduct" product={product} />
            <Product className="Forproduct" product={product} />
            <Product className="Forproduct" product={product} />
            <Product className="Forproduct" product={product} />
            <Product className="Forproduct" product={product} />
            <Product className="Forproduct" product={product} />
            <Product className="Forproduct" product={product} />
         </div>
      </>

   )
}

export default Home