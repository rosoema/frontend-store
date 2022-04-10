import { Component } from "react";

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
            <div>Hello</div>
        )
    }
}

export default Category;