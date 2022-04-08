import { Component } from "react";
import cart from "../Media/Cart.svg";
import MiniCart from "./MiniCart";
import { OuterClick } from "react-outer-click";

class Cart extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: this.props.value,
            miniCart: false
        }
    }

    toggle(){
        this.setState({miniCart: !this.state.miniCart})
    }

    render() {
        return (
            <div>
                <img src={cart} alt="cart" onClick={this.toggle.bind(this)}/>
                <OuterClick onOuterClick= {
                    () => {
                        if(this.state.miniCart === true){
                            this.setState({miniCart: false})
                        }
                    }} >
                    {this.state.miniCart &&
                        <MiniCart/>
                    }
                </OuterClick>
            </div>
        )
    }
};

export default Cart;