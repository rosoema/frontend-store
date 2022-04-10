import { Component } from "react";
import cart from "../Media/Cart.svg";
import { OuterClick } from "react-outer-click";
import { Bag } from "../Components/styled/Header.js"

class MiniCart extends Component {

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
                <OuterClick onOuterClick= {
                    () => {
                        this.setState({miniCart: false})
                }} >
                <img src={cart} alt="cart" onClick={this.toggle.bind(this)} className="mini-cart"/>
                    {this.state.miniCart &&
                        <Bag>
                            <p>My Bag</p>
                        </Bag>
                    }
                </OuterClick>
            </div>
        )
    }
};

export default MiniCart;