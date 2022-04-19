import { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../Media/logo.svg";
import Currency from "./Currency.js";
import MiniCart from "./MiniCart.js";
import { Nav , List , ListItem, Image } from "./styled/Header";

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: this.props.value,
            cart: JSON.parse(localStorage.getItem("cart"))
        }
    }

    render() {

        return (
            <Nav>
                <List>
                    {this.state.data.categories.map( cat =>
                        <ListItem key={cat.name} className={"header-links " + cat.name}>
                            <Link to={"/category/" + cat.name} onClick={() => localStorage.setItem("category", cat.name)}>{cat.name}</Link>
                        </ListItem>)
                    } 
                </List>
                    <Link to={"/category/" + this.state.data.categories[0].name} onClick={() => localStorage.setItem("category", this.state.data.categories[0].name)}><Image src={logo} alt="store-logo" /></Link>
                    <div className="currency-cart">
                        <Currency value={this.state.data.currencies}/>
                        <MiniCart value={this.state.data}/>
                    </div>
            </Nav>
                        
                    
                
            
        )
    }
};

export default Navbar;