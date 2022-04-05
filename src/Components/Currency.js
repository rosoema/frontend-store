import { Component } from "react";

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
        })
        localStorage.setItem("preferredCurrency", arg)
    }

    render() {
        return (
            <div>
                <p onClick={this.toggle.bind(this)}>{this.state.preferredCurrency}</p>
                { this.state.active === true && 
                    <div>
                        { this.state.data.map( currency => 
                            <div onClick={() => this.setCurrency(currency.symbol)} key={currency.label} value={currency.symbol}>
                                <p>{currency.label}</p>
                                <p>{currency.symbol}</p>
                            </div>)
                        }
                    </div>
                }
            </div>
        )
    }
};

export default Currency;