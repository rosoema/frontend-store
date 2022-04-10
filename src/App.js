import { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import Data from "./GraphQL/data";
import { Query } from "@apollo/client/react/components";

class App extends Component {

  render() {
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
                              <Navbar value={data} />
                              <Routes>
                                <Route path="/category/:id" element={<Category/>} />
                                <Route path="/product/:id" element={<Element/>} />
                                <Route path="/cart" element={<Cart/>} />*/}
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
