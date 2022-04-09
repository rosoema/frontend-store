import { Component } from "react";
import Arrow from "../Media/Arrow_Down.svg";
import { OuterClick } from "react-outer-click";

class Currency extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: this.props.value,
            preferredCurrency: localStorage.getItem("preferredCurrency") || this.props.value[0].symbol,
            active: false
        }
    }

    toggle(){
        this.setState({active: !this.state.active})
    }

    setCurrency(arg){
        this.setState({
            active: false,
            preferredCurrency: arg
        });
        localStorage.setItem("preferredCurrency", arg)
    }

    render() {
        return (
            <div className="currency-open">
                <OuterClick onOuterClick = {
                    () => {
                        this.setState({active: false})
                    }
                }>
                <p onClick={this.toggle.bind(this)}>{this.state.preferredCurrency} <img src={Arrow} alt="arrow-down" className={this.state.active ? "arrow-up" : "arrow"}/></p>
                { this.state.active === true && 
                    <div className="show-currency">
                        { this.state.data.map( currency => 
                            <div onClick={() => this.setCurrency(currency.symbol)} key={currency.label} value={currency.symbol}>
                                <p>{currency.symbol}</p>
                                <p>{currency.label}</p>
                            </div>)
                        }
                    </div>
                }
                </OuterClick>
            </div>
        )
    }
};

export default Currency;