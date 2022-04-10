import { Component } from "react";
import Data from "../GraphQL/data";
import { Query } from "@apollo/client/react/components";

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pathName: "all"
        }
    }
    
    render() {
        window.addEventListener("click", () => {
            this.setState(
                {
                    pathName: localStorage.getItem("category")
                }
            );
        });

        return (
            <Query query={Data}>
                {({ data, loading, error }) => {
                    if(loading) {
                        return "Loading..."; // Put in an error page ?
                    } if(error) {
                        return null;
                    } else {
                        return (
                            <div>
                                <h1>{this.state.pathName}</h1>
                                <div>
                                    {data.categories.map( cat => 
                                       { if(cat.name === this.state.pathName){
                                            return (
                                                <div>
                                                    {cat.products.map( product => 
                                                        <div key={product.id}>
                                                            <img src={product.gallery[0]} alt="product"/>
                                                            <p>{product.name}</p>
                                                            {product.prices.map( price => 
                                                                { if(price.currency.symbol === localStorage.getItem("preferredCurrency")){
                                                                    return (
                                                                        <p>{price.currency.symbol}<span>{price.amount}</span></p>
                                                                    )
                                                                }} 
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                       }}
                                    )}
                                </div>
                            </div>
                        );
                    }
                }}
            </Query>
        )
    }
}

export default Category;