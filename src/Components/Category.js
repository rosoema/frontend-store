import { Component } from "react";
import { Link } from "react-router-dom";
import { ProductsContainer, Wrapper, ProductDiv } from "./styled/ProductDisplay.js"
import addToCart from "../Media/addToCart.svg";

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: this.props.path || localStorage.getItem("category"),
            data: this.props.value,
            currency: localStorage.getItem("preferredCurrency"),
            products: []
        }
    }
    
    render() {

        window.addEventListener("click", () => {
            this.setState(
                {
                    category: localStorage.getItem("category"),
                    currency: localStorage.getItem("preferredCurrency")
                }
            );
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
                                            <div className="productImage" style={{backgroundImage: `url(${product.gallery[1] ? product.gallery[1] : product.gallery[0]})`}}>
                                                {product.inStock === false && 
                                                <p>OUT OF STOCK</p>}
                                            </div>
                                            {
                                                product.inStock ? 
                                                product.attributes.length <= 0 ? 
                                                    <img src={addToCart} alt="add-to-cart" className="addToCart" />
                                                : <Link to={"/product/" + product.id} className="addToCart">
                                                    <img src={addToCart} alt="add-to-cart" />
                                                </Link>
                                                : null
                                            }
                                            <div>
                                                <p>{product.name}</p>
                                                {
                                                    product.prices.map( price => 
                                                        price.currency.symbol === this.state.currency ? 
                                                        <p key={price.amount} className="price">{price.currency.symbol}<span>{price.amount}</span></p>
                                                        : null
                                                    )
                                                }
                                            </div>
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