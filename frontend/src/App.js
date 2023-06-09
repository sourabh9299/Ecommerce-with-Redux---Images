import './App.css';
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer"
import WebFont from "webfontloader"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import ProductDetails from './components/Home/ProductDetails';
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'

 

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"]
      }
    })
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route extact path='/' Component={Home} />
        <Route extact path='/product/:id' Component={ProductDetails} />
        <Route  path='/products' Component={Products} />
        <Route  path='/products/:keyword' Component={Products} />
        <Route path='/search' Component={Search} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
