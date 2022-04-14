import { Component } from "react";
import cart from "../Media/Cart.svg";
import { OuterClick } from "react-outer-click";
import { Bag } from "./styled/Header.js";
import { Title, Wrapper, ProductWrapper, Overlay } from "./styled/MiniCart.js";
import { Link } from "react-router-dom";

class MiniCart extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: this.props.value,
            miniCart: false,
            cart: JSON.parse(localStorage.getItem("cart")),
            category: localStorage.getItem("category"),
            currency: localStorage.getItem("preferredCurrency"),
            total: []
        }
    }

    add(e){
        let oldCart = this.state.cart;
        let newCart;
        let match = oldCart.filter( item => item.id === e.target.dataset.value );
        let noMatch = oldCart.filter( item => item.id !== e.target.dataset.value );

        newCart = [
            ...noMatch,
            {
                id: e.target.dataset.value,
                num: match[0].num + 1,
                name: match[0].name,
                brand: match[0].brand,
                gallery: match[0].gallery,
                price: match[0].price,
                attributes: match[0].attributes
            }
        ];
        this.setState({
            cart: newCart
        }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.cart))
        });
    }

    remove(e){
        let oldCart = this.state.cart;
        let newCart;
        let match = oldCart.filter( item => item.id === e.target.dataset.value );
        let noMatch = oldCart.filter( item => item.id !== e.target.dataset.value );

        match[0].num > 1 ?
            newCart = [
                ...noMatch,
                {
                    id: e.target.dataset.value,
                    num: match[0].num - 1,
                    name: match[0].name,
                    brand: match[0].brand,
                    gallery: match[0].gallery,
                    price: match[0].price,
                    attributes: match[0].attributes
                }
            ]
            : newCart = [...noMatch]

        this.setState({
            cart: newCart
        }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.cart))
        });
    }

    toggle(){
        this.setState({miniCart: !this.state.miniCart})
    }

    render() {
        window.addEventListener("click", () => {
            this.setState({
                cart: JSON.parse(localStorage.getItem("cart")),
                total: []
            })
        });

        return (
            <div>
                {
                    this.state.miniCart && <Overlay height={document.body.offsetHeight + "px"}/>
                }
                <OuterClick onOuterClick= {
                    () => {
                        this.setState({miniCart: false})
                }} >
                <img src={cart} alt="cart" onClick={this.toggle.bind(this)} className="mini-cart"/>
                    {this.state.miniCart &&
                        <Bag>
                            {
                                this.state.cart ? 
                                <Wrapper>
                                    <Title>My Bag <span>,{this.state.cart.length} item{ this.state.cart.length === 1 ? null : "s"}</span></Title>
                                    {
                                        this.state.cart.map( item => 
                                            <ProductWrapper key={item.id}>
                                                <div>
                                                    <p>{item.brand}</p>
                                                    <p>{item.name}</p>
                                                    {
                                                        JSON.parse(item.price).map( curr =>
                                                            {
                                                                if(curr.currency.symbol === localStorage.getItem("preferredCurrency")) { 
                                                                    <p key={curr.currency.symbol} className="product-price">
                                                                        {curr.currency.symbol}
                                                                        <span>{curr.amount * item.num}</span>
                                                                    </p>
                                                                    this.state.total.push(curr.amount * item.num)
                                                                }
                                                            }
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
                                                <div className="button-image">
                                                    <div className="add-remove-buttons">
                                                        <p className="add-remove" onClick={this.add.bind(this)}
                                                            data-value={item.id}
                                                        >+</p>
                                                        <p>{item.num}</p>
                                                        <p className="add-remove" onClick={this.remove.bind(this)} data-value={item.id}>-</p>
                                                    </div>
                                                    <div style={{
                                                        backgroundImage: `url("${item.gallery}")`
                                                    }} className="product-image"/>
                                                </div>
                                            </ProductWrapper>
                                        )
                                    }
                                    <div className="total">
                                        <p>Total:</p>
                                        <p>{this.state.currency}{Math.round(this.state.total.reduce((a,b) => a+b, 0) * 100) / 100}</p>
                                    </div>
                                    <div className="buttons">
                                        <Link to="/cart">View bag</Link>
                                        <button>Check out</button>
                                    </div>
                                </Wrapper>
                                
                                : <p>Your cart is empty.</p>
                            }
                        </Bag>
                    }
                </OuterClick>
            </div>
        )
    }
};

export default MiniCart;