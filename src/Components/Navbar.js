import { Query } from "@apollo/client/react/components";
import { Component } from "react";
import { Link } from "react-router-dom";
import data from "../GraphQL/data";
import logo from "../Media/logo.svg";
import Currency from "./Currency.js";
import Cart from "./Cart.js";

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <Query query={data}>
                {({ data, loading, error }) => {
                    if(loading) {
                        return "Loading..."; // Put in an error page ?
                    } if(error) {
                        return null;
                    } else {
                        return (
                            <nav>
                                <ul>
                                    {data.categories.map( cat => <li key={cat.name}><Link to={"/" + cat.name}>{cat.name}</Link></li>)}
                                </ul>
                                <Link to={"/" + data.categories[0].name}><img src={logo} alt="store-logo" /></Link>
                                <div className="currency-cart">
                                    <Currency value={data.currencies}/>
                                    <Cart value={data} />
                                </div>
                            </nav>
                        );
                    }
                }}
            </Query>
        )
    }
};

export default Navbar;