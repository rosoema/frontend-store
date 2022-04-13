import { Component } from "react";
import { Link } from "react-router-dom";
import { ProductsContainer, Wrapper, ProductDiv } from "./styled/ProductDisplay.js"
import addToCart from "../Media/addToCart.svg";

class Category extends Component {

    constructor(props) {

        super(props);
        this.state = {
            category: this.props.path,
            data: this.props.value,
            currency: localStorage.getItem("preferredCurrency") || "$",
            cart: JSON.parse(localStorage.getItem("cart"))
        }

        this.putInCart = this.putInCart.bind(this);

        if (window.performance) {
            if (performance.navigation.type == 1) {
                let url = window.location.href;
                let theEnd = url.split("/").pop();
                if(theEnd === ""){
                    localStorage.setItem("category", this.props.path);
                    this.state.category = this.props.path
                } else {
                    localStorage.setItem("category", theEnd);
                    this.state.category = theEnd
                }
            } else {
              return null
            }
        }
    }

    putInCart(e){
        let oldCart = this.state.cart;
        let newCart;

        if(localStorage.getItem("cart") === null){
            newCart = [
                {
                    id: e.target.dataset.value,
                    num: 1
                }
            ];
            this.setState({
                cart: newCart
            }, () => {
                localStorage.setItem("cart", JSON.stringify(this.state.cart))
            });
        } else {
            let match = oldCart.filter( item => item.id === e.target.dataset.value );
            let noMatch = oldCart.filter( item => item.id !== e.target.dataset.value );
        
            if(match.length <= 0){
                newCart = [
                    ...noMatch,
                    {
                        id: e.target.dataset.value,
                        num: 1
                    }
                ];
                this.setState({
                    cart: newCart
                }, () => {
                    localStorage.setItem("cart", JSON.stringify(this.state.cart))
                });
            } else {
                newCart = [
                    ...noMatch,
                    {
                        id: e.target.dataset.value,
                        num: match[0].num + 1
                    }
                ];
                this.setState({
                    cart: newCart
                }, () => {
                    localStorage.setItem("cart", JSON.stringify(this.state.cart))
                });
            }
        }
    }
    
    render() {

        window.addEventListener("click", () => {
            let url = window.location.href;
            let theEnd = url.split("/").pop();
            if(theEnd === ""){
                localStorage.setItem("category", this.props.path);
                this.setState({
                    category: this.props.path,
                    currency: localStorage.getItem("preferredCurrency") ? localStorage.getItem("preferredCurrency") : "$"
                })
            } else {
                localStorage.setItem("category", theEnd);
                this.setState({
                    category: theEnd,
                    currency: localStorage.getItem("preferredCurrency") ? localStorage.getItem("preferredCurrency") : "$"
                })
            }
        });

        window.addEventListener("popstate", () => {
            let url = window.location.href;
            let theEnd = url.split("/").pop();
            if(theEnd !== ""){
                this.setState(
                    {
                        category: theEnd,
                        currency: localStorage.getItem("preferredCurrency") || "$"
                    }
                );
            } else {
                this.setState(
                    {
                        category: this.props.path,
                        currency: localStorage.getItem("preferredCurrency") || "$"
                    }
                );
            }
        });

        return (
            <Wrapper>
                <h1>{this.state.category}</h1>
                <div>
                    <ProductsContainer>
                        {this.state.data.map( category => 
                            category.name === this.state.category ? 
                                category.products.map( product =>
                                    <ProductDiv key={product.id} style={{opacity: product.inStock ? "1" : "0.3", }}>
                                        <Link to={"/product/" + product.id}>
                                            <div className="productImage" style={{backgroundImage: `url(${product.gallery[1] ? product.gallery[1] : product.gallery[0]})`}}>
                                                {product.inStock === false && 
                                                    <p>OUT OF STOCK</p>}
                                            </div>
                                            <div>
                                                <p><span className="brand">{product.brand}</span>{product.name}</p>
                                                {
                                                    product.prices.map( price => 
                                                        price.currency.symbol === this.state.currency ? 
                                                        <p key={price.amount} className="price">{price.currency.symbol}<span>{price.amount}</span></p>
                                                        : null
                                                    )
                                                }
                                            </div>
                                        </Link>
                                        {
                                            product.inStock ? 
                                            product.attributes.length <= 0 ? 
                                                <img src={addToCart} alt="add-to-cart" className="addToCart" onClick={this.putInCart} data-value={product.id}/>
                                            : <Link to={"/product/" + product.id} className="addToCart">
                                                <img src={addToCart} alt="add-to-cart"/>
                                            </Link>
                                            : null
                                        }
                                    </ProductDiv> 
                                )
                                : null
                        )}
                    </ProductsContainer>
                </div>
            </Wrapper>
        )
    }
}

export default Category;