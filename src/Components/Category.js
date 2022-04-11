import { Component } from "react";
import { Link } from "react-router-dom";

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
                    category: localStorage.getItem("category")
                }
            );
        });

        return (
            <div>
                <h1>{this.state.category}</h1>
                {this.state.data.map( category => 
                    category.name === this.state.category ? 
                            category.products.map( product => 
                                <Link key={product.id} to={"/product/" + product.id}>
                                    <div>
                                        <img src={product.gallery[0]} alt={product.name} />
                                        <p>{product.name}</p>
                                        {
                                            product.prices.map( price => 
                                                price.currency.symbol === this.state.currency ? 
                                                <p key={price.amount}>{price.currency.symbol}<span>{price.amount}</span></p>
                                                : null
                                            )
                                        }
                                    </div>
                                </Link>   
                            )
                            : null
                )}
            </div>
        )
    }
}

export default Category;