import { Component } from "react";
import { Link } from "react-router-dom";
import { ProductsContainer, Wrapper, ProductDiv } from "./styled/ProductDisplay.js"

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: this.props.path || localStorage.getItem("category"),
            data: this.props.value,
            currency: localStorage.getItem("preferredCurrency")
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
                                    <Link key={product.id} to={"/product/" + product.id}>
                                        <ProductDiv>
                                            <div style={{backgroundImage: `url(${product.gallery[1] ? product.gallery[1] : product.gallery[0]})`}} />
                                            <p>{product.name}</p>
                                            {
                                                product.prices.map( price => 
                                                    price.currency.symbol === this.state.currency ? 
                                                    <p key={price.amount} className="price">{price.currency.symbol}<span>{price.amount}</span></p>
                                                    : null
                                                )
                                            }
                                        </ProductDiv>
                                    </Link>   
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