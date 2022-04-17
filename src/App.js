import { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import Data from "./GraphQL/data";
import { Query } from "@apollo/client/react/components";
import Cart from "./Components/Cart.js";
import Product from "./Components/Product.js";

class App extends Component {

  componentDidMount(){
      if(localStorage.getItem("category") === null){
        localStorage.setItem("category", "all")
        window.location.reload()
      }

      if(localStorage.getItem("preferredCurrency") === null){
        localStorage.setItem("preferredCurrency", "$")
        window.location.reload()
      }
  }

  render(){
    
    return (
      <Query query={Data}>
                {({ data, loading, error }) => {
                    if(loading) {
                        return "Loading..."; // Put in an error page ?
                    } if(error) {
                        return null;
                    } else {
                        return (
                            <Fragment>
                              <Navbar value={data}/>
                              <Routes>
                                <Route path="/" element={<Category path="all" value={data.categories}/>} />
                                <Route path="/category/:id" element={<Category value={data.categories}/>}/>
                                <Route path="/cart" element={<Cart />}/>
                                <Route path="/product/:id" element={<Product value={data.categories}/>} />
                              </Routes>
                            </Fragment>
                        );
                    }
                }}
        </Query>    
    )
  }

};

export default App;
