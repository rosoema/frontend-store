import { Component } from "react";
import cart from "../Media/Cart.svg";
import { OuterClick } from "react-outer-click";
import { Bag } from "./styled/Header.js";
import { Title, Wrapper, ProductWrapper, Overlay } from "./styled/MiniCart.js";
import { Link } from "react-router-dom";
import minus from "../Media/minus-square.svg";
import plus from "../Media/plus-square.svg";

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
            {
                id: e.target.dataset.value,
                num: match[0].num + 1,
                name: match[0].name,
                brand: match[0].brand,
                gallery: match[0].gallery,
                price: match[0].price,
                attributes: match[0].attributes,
                chosenAtt: match[0].chosenAtt
            },
            ...noMatch
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
                {
                    id: e.target.dataset.value,
                    num: match[0].num - 1,
                    name: match[0].name,
                    brand: match[0].brand,
                    gallery: match[0].gallery,
                    price: match[0].price,
                    attributes: match[0].attributes,
                    chosenAtt: match[0].chosenAtt
                },
                ...noMatch
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
                    this.state.miniCart && <Overlay height={document.body.offsetHeight < window.innerHeight ? window.innerHeight + "px" : document.body.offsetHeight + "px"}/>
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
                                                                    return <p key={curr.currency.symbol} className="product-price">
                                                                                {curr.currency.symbol}
                                                                                <span>{curr.amount * item.num}</span>
                                                                                {this.state.total.push(curr.amount * item.num)}
                                                                            </p>
                                                                }
                                                            }
                                                        )    
                                                    }
                                                    <div>
                                                        {
                                                            JSON.parse(item.attributes).map( set => 
                                                                JSON.parse(item.chosenAtt).map( chosenSet => 
                                                                    set.type === "text" && set.name === chosenSet.set ?
                                                                        <div key={set.name} className="minicart-att">
                                                                            {set.items.map( value => 
                                                                                value.value === chosenSet.value ?    
                                                                                <p className="minicart-att-value" key={value.id} style={{opacity: "1"}}>{value.id}</p>
                                                                                : <p className="minicart-att-value" key={value.id} style={{opacity: "0.3"}}>{value.id}</p>
                                                                            )}
                                                                        </div>
                                                                    : set.type === "swatch" && set.name === chosenSet.set ?
                                                                        <div key={set.name} className="minicart-att">
                                                                            {set.items.map( value => 
                                                                                value.displayValue === chosenSet.value ?    
                                                                                <p className="minicart-att-value value-not-text" key={value.id} style={{backgroundColor: `${value.value}`, opacity: "1"}}></p>
                                                                                : <p className="minicart-att-value value-not-text" key={value.id} style={{backgroundColor: `${value.value}`, opacity: ".3"}}></p>
                                                                            )}
                                                                        </div>
                                                                    : null
                                                                )
                                                            )                                            
                                                        }
                                                    </div>
                                                </div>
                                                <div className="button-image">
                                                    <div className="add-remove-buttons">
                                                    <img src={plus} className="add-remove" onClick={this.add.bind(this)}
                                                        data-value={item.id} alt="plus"/>
                                                    <p>{item.num}</p>
                                                    <img src={minus} className="add-remove" onClick={this.remove.bind(this)} 
                                                        data-value={item.id} alt="minus"/>
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
                                        <Link to="/cart" onClick={() => { this.setState({miniCart: false})}}>View bag</Link>
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