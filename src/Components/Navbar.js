import { Query } from "@apollo/client/react/components";
import { Component } from "react";
import { Link } from "react-router-dom";
import data from "../GraphQL/data";
import logo from "../Media/logo.svg";
import Currency from "./Currency.js";
import MiniCart from "./MiniCart.js";
import { Nav , List , ListItem, Image } from "./styled/Header";



class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render() {

        window.addEventListener("popstate", () => {
            
        })

        return (
            <Query query={data}>
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
                                        <ListItem key={cat.name} className="header-links" openOrNot={cat.name}>
                                            <Link to={"/" + cat.name}>{cat.name}</Link>
                                        </ListItem>)
                                    } 
                                </List>
                                <Link to={"/" + data.categories[0].name}><Image src={logo} alt="store-logo" /></Link>
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