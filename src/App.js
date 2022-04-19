import { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import Data from "./GraphQL/data";
import { Query } from "@apollo/client/react/components";
import Cart from "./Components/Cart.js";
import Product from "./Components/Product.js";

let links = document.getElementsByClassName("header-links");

function addCurrent () {
    let url = window.location.href;
    let theEnd = url.split("/").pop();
    for(let i = 0; i < links.length; i++){
        if(links[i].classList.contains(theEnd)){
            links[i].classList.add("current");
        } else {
            links[i].classList.remove("current");
        }
    }
}

window.addEventListener("click", () => {
    addCurrent();
});

class App extends Component {

    componentDidMount(){
        return localStorage.getItem("preferredCurrency") ? null : localStorage.setItem("preferredCurrency", "$")
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
