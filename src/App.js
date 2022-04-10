import { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Category from "./Components/Category";

class App extends Component {

  render() {
    return (

      <Fragment>
        <Navbar/>
        <Routes>
          <Route path="/category/:id" element={<Category/>}></Route>
        </Routes>
      </Fragment>
    
    )
  }

};

export default App;
