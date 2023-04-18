import React, { Fragment, useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import "./Search.css"

const  Search=({history})=> {
    const nav = useNavigate ();
    const [keyword,setKeyWord]=useState('');

    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            nav(`/products/${keyword}`)
        }else{
            nav(`/Products}`)
        }



    }
    return (
        <Fragment>
            <div className='Searchbox-main'>

            <form className='searchBox' action="" onSubmit={searchSubmitHandler}>
            <input type="text" 
            placeholder='Search Product'
            onChange={(e)=>setKeyWord(e.target.value)}
            />
            <input 
            type='submit' value="Search"
            />
            </form>
            </div>
        </Fragment>
    )
}

export default Search