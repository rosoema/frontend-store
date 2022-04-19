import { Component, Fragment } from "react";
import minus from "../Media/minus-square.svg";
import plus from "../Media/plus-square.svg";

class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            cart: JSON.parse(localStorage.getItem("cart")),
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
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
            this.setState({
                total: []
            })
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
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
            this.setState({
                total: []
            })
        });
    }

    render(){

        return (
            <div className="cart-container">
                <p className="cart-title">CART</p>
                <hr/>
                    {
                        this.state.cart ? 
                            <div>
                                {
                                    this.state.cart.map( item => 
                                        <Fragment>
                                        <div key={item.id} className="cart-product-container">
                                            <div className="cart-product-main">
                                                <p>{item.brand}</p>
                                                <p>{item.name}</p>
                                                {
                                                    JSON.parse(item.price).map( curr =>
                                                        {
                                                            if(curr.currency.symbol === localStorage.getItem("preferredCurrency")) { 
                                                                this.state.total.push(curr.amount * item.num)
                                                                return <p key={curr.currency.symbol} className="cart-product-price">
                                                                            {curr.currency.symbol}
                                                                            <span>{Math.round((curr.amount * item.num) * 100) / 100}</span>
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
                                                                        <p className="minicart-att-value big-cart-att" key={value.id} style={{backgroundColor: "black", color: "white", opacity: "1"}}>{value.id}</p>
                                                                        : <p className="minicart-att-value big-cart-att" key={value.id} style={{opacity: "0.3"}}>{value.id}</p>
                                                                    )}
                                                                </div>
                                                            : set.type === "swatch" && set.name === chosenSet.set ?
                                                                <div key={set.name} className="minicart-att">
                                                                    {set.items.map( value => 
                                                                        value.displayValue === chosenSet.value ?    
                                                                        <p className="minicart-att-value value-not-text big-cart-not-text" key={value.id} style={{backgroundColor: `${value.value}`, opacity: "1"}}></p>
                                                                        : <p className="minicart-att-value value-not-text big-cart-not-text" key={value.id} style={{backgroundColor: `${value.value}`, opacity: ".3"}}></p>
                                                                    )}
                                                                </div>
                                                            : null
                                                        )
                                                    )                                            
                                                }
                                                </div>
                                            </div>
                                            <div className="button-image">
                                                <div className="add-remove-buttons cart-buttons">
                                                    <img src={plus} className="add-remove cart-add-remove" onClick={this.add.bind(this)}
                                                        data-value={item.id} alt="plus"/>
                                                    <p>{item.num}</p>
                                                    <img src={minus} className="add-remove" onClick={this.remove.bind(this)} 
                                                        data-value={item.id} alt="minus"/>
                                                </div>
                                                <div style={{
                                                    backgroundImage: `url("${item.gallery}")`
                                                }} className="product-image cart-image"/>
                                            </div>
                                        </div>
                                        <hr />
                                        </Fragment>
                                    )
                                }
                                <div className="total cart-total">
                                    <p>Total:</p>
                                    <p>{localStorage.getItem("preferredCurrency")}{Math.round(this.state.total.reduce((a,b) => a+b, 0) * 100) / 100}</p>
                                </div>
                            </div>                                
                            : <p className="notify">Your cart is empty.</p>
                        }
                    </div>
        )
    }

}

export default Cart;