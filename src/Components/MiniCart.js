import { Component } from "react";
import cart from "../Media/Cart.svg";
import { OuterClick } from "react-outer-click";
import { Bag } from "../Components/styled/Header.js"

class MiniCart extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: this.props.value,
            miniCart: false,
            cart: JSON.parse(localStorage.getItem("cart")),
            category: localStorage.getItem("category"),
            currency: localStorage.getItem("preferredCurrency")
        }
    }

    toggle(){
        this.setState({miniCart: !this.state.miniCart})
    }

    render() {
        window.addEventListener("click", () => {
            this.setState({
                cart: JSON.parse(localStorage.getItem("cart"))
            })
        });

        return (
            <div>
                <OuterClick onOuterClick= {
                    () => {
                        this.setState({miniCart: false})
                }} >
                <img src={cart} alt="cart" onClick={this.toggle.bind(this)} className="mini-cart"/>
                    {this.state.miniCart &&
                        <Bag>
                            {
                                this.state.cart ? 
                                <div>
                                    <p>My Bag, {this.state.cart.length} item{ this.state.cart.length === 1 ? null : "s"}</p>
                                    {
                                        this.state.cart.map( item => 
                                            <div key={item.id}>
                                                <div>
                                                    <p>{item.brand}</p>
                                                    <p>{item.name}</p>
                                                    {
                                                        JSON.parse(item.price).map( curr =>
                                                            curr.currency.symbol === localStorage.getItem("preferredCurrency") ? 
                                                            <p key={curr.currency.symbol}>
                                                                {curr.currency.symbol}
                                                                <span>{curr.amount * item.num}</span>
                                                            </p>
                                                            : null
                                                        )    
                                                    }
                                                    <div>
                                                        {
                                                            JSON.parse(item.attributes).map( set => 
                                                                set.type === "text" ?
                                                                set.items.map( item => 
                                                                    <p key={item.name}>{item.displayValue}</p>
                                                                )
                                                                : 
                                                                set.items.map( item => 
                                                                    <p key={item.name} style={{backgroundColor: `${item.value}`}}>hello</p>
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>+</p>
                                                    <p>{item.num}</p>
                                                    <p>-</p>
                                                </div>
                                                <div>
                                                    <img src={item.gallery} alt="" />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                
                                : "Your cart is empty"
                            }
                        </Bag>
                    }
                </OuterClick>
            </div>
        )
    }
};

export default MiniCart;