import { Component } from "react";

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
            <div>{this.state.category}</div>
        )
    }
}

export default Category;