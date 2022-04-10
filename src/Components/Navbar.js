import { Query } from "@apollo/client/react/components";
import { Component } from "react";
import { Link } from "react-router-dom";
import Data from "../GraphQL/data";
import logo from "../Media/logo.svg";
import Currency from "./Currency.js";
import MiniCart from "./MiniCart.js";
import { Nav , List , ListItem, Image } from "./styled/Header";


let links = document.getElementsByClassName("header-links");

window.addEventListener("click", () => {
    let url = window.location.href;
    let theEnd = url.split("/").pop();
    for(let i = 0; i < links.length; i++){
        if(links[i].classList.contains(theEnd)){
            links[i].classList.add("current");
        } else {
            links[i].classList.remove("current");
        }
    }
});

class Navbar extends Component {

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
                            <Nav>
                                <List>
                                    {data.categories.map( cat =>
                                        <ListItem key={cat.name} className={"header-links " + cat.name}>
                                            <Link to={"/category/" + cat.name} onClick={() => localStorage.setItem("category", cat.name)}>{cat.name}</Link>
                                        </ListItem>)
                                    } 
                                </List>
                                <Link to={"/category/" + data.categories[0].name}><Image src={logo} alt="store-logo" /></Link>
                                <div className="currency-cart">
                                    <Currency value={data.currencies}/>
                                    <MiniCart value={data} />
                                </div>
                            </Nav>
                        );
                    }
                }}
            </Query>
        )
    }
};

export default Navbar;