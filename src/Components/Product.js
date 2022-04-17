import { Component, Fragment } from "react";

class Product extends Component {

    constructor(props){
        super(props);
        this.state = {
            category: localStorage.getItem("product-category"),
            id: localStorage.getItem("product-id"),
            data: this.props.value,
            current_photo: localStorage.getItem("product-image"),
            cart: JSON.parse(localStorage.getItem("cart")),
            product_att: JSON.parse(localStorage.getItem("attributes"))
        }
    }

    attUpdate(e) {
        if(localStorage.getItem("attributes") === null){
            this.setState({
                product_att: [{
                    set: e.target.dataset.name,
                    value: e.target.dataset.value
                }]
            }, () => {
                localStorage.setItem("attributes", JSON.stringify(this.state.product_att))
            })
        } else {
            let noMatch = this.state.product_att.filter( atts => atts.set !==  e.target.dataset.name);

            this.setState({
                product_att: [
                    ...noMatch,
                    {
                        set: e.target.dataset.name,
                        value: e.target.dataset.value
                    }
                ]
            }, () => {
                localStorage.setItem("attributes", JSON.stringify(this.state.product_att))
            })
        }
    }

    componentDidMount(){
        localStorage.removeItem("attributes")
        this.setState({
            product_att: []
        })
    }

    add(e){
        let oldCart = this.state.cart;
        let newCart;

        if(localStorage.getItem("cart") === null){
            newCart = [
                {
                    id: e.target.dataset.value,
                    num: 1,
                    name: e.target.dataset.name,
                    brand: e.target.dataset.brand,
                    gallery: e.target.dataset.gallery,
                    price: e.target.dataset.price,
                    attributes: e.target.dataset.attributes,
                    chosenAtt: e.target.dataset.chosen
                }
            ];
            this.setState({
                cart: newCart
            }, () => {
                localStorage.setItem("cart", JSON.stringify(this.state.cart))
            });
        } else {
            let match = oldCart.filter( item => item.id === e.target.dataset.value );
            let noMatch = oldCart.filter( item => item.id !== e.target.dataset.value );
        
            if(match.length <= 0){
                newCart = [
                    ...noMatch,
                    {
                        id: e.target.dataset.value,
                        num: 1,
                        name: e.target.dataset.name,
                        brand: e.target.dataset.brand,
                        gallery: e.target.dataset.gallery,
                        price: e.target.dataset.price,
                        attributes: e.target.dataset.attributes,
                        chosenAtt: e.target.dataset.chosen
                    }
                ];
                this.setState({
                    cart: newCart
                }, () => {
                    localStorage.setItem("cart", JSON.stringify(this.state.cart))
                });
            } else {
                newCart = [
                    ...noMatch,
                    {
                        id: e.target.dataset.value,
                        num: match[0].num + 1,
                        name: e.target.dataset.name,
                        brand: e.target.dataset.brand,
                        gallery: e.target.dataset.gallery,
                        price: e.target.dataset.price,
                        attributes: e.target.dataset.attributes,
                        chosenAtt: e.target.dataset.chosen
                    }
                ];
                this.setState({
                    cart: newCart
                }, () => {
                    localStorage.setItem("cart", JSON.stringify(this.state.cart))
                });
            }
        }
    }

    render() {

        window.addEventListener("click", () => {
            this.setState({
                product_att: JSON.parse(localStorage.getItem("attributes"))
            })
        })

        return (
            <div className="product-page-container">
                {
                    this.state.data.map( category => 
                        category.name === this.state.category ? 
                            category.products.map( product => 
                                product.id === this.state.id ? 
                                    <Fragment key={product.id}>
                                        <div >
                                            {
                                                product.gallery.length === 1 ?
                                                <div style={{backgroundImage: `url(${product.gallery[0]})`}} className="product-main-image"/>
                                                : <div className="gallery-container">
                                                    <div className="mini-image-container">
                                                        {
                                                            product.gallery.map( image => 
                                                                <div key={image} className="mini-image" style={{backgroundImage: `url(${image})`}} onClick={() => {
                                                                    this.setState({
                                                                        current_photo: image
                                                                    })
                                                                }}/>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="main-image" style={{backgroundImage: `url(${this.state.current_photo})`}}/>
                                                  </div>
                                            }
                                        </div>
                                        <div className="product-page-info">
                                            <div className="cart-product-main">
                                                <p>{product.brand}</p>
                                                <p>{product.name}</p>
                                            </div>
                                            <form id="attForm">
                                            {
                                                product.attributes.map( set => 
                                                    <div key={set.name}>
                                                        <p className="att-price">{set.name}:</p>
                                                        <ul className="att-cont">
                                                        {
                                                            set.type === "text" ?
                                                            set.items.map( item => 
                                                                <li key={item.id}>
                                                                    <input id={item.id} type="radio" value={item.displayValue} name={set.name} data-name={set.name} data-value={item.displayValue} required className="input" onClick={this.attUpdate.bind(this)}/>
                                                                    <label for={item.id} className="att">{item.displayValue}</label>
                                                                </li>
                                                            )
                                                            : 
                                                            set.items.map( item =>
                                                                <li key={item.id}>
                                                                    <input id={item.id} type="radio" value={item.displayValue} name={set.name}  required className="input input-not-text" data-name={set.name} data-value={item.displayValue} onClick={this.attUpdate.bind(this)}/>
                                                                    <label for={item.id} className="att-not-text" style={{backgroundColor: `${item.value}`}}></label>
                                                                </li>
                                                            )
                                                        }
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                            </form>
                                            {
                                                product.prices.map( curr => 
                                                    curr.currency.symbol === localStorage.getItem("preferredCurrency") ?
                                                    <div key={curr.currency.label}>
                                                        <p className="att-price">Price:</p>
                                                        <p className="product-price">{curr.currency.symbol}{curr.amount}</p>
                                                    </div>
                                                    :null
                                                )
                                            }
                                            {
                                                product.inStock ?
                                                <div className="button-div">
                                                    <button type="submit" form="attForm" className="add-cart-button" onClick={this.add.bind(this)}
                                                        data-value={product.id} 
                                                        data-name={product.name} 
                                                        data-gallery={product.gallery[1] ? product.gallery[1] : product.gallery[0]}
                                                        data-brand={product.brand}
                                                        data-price={JSON.stringify(product.prices)}
                                                        data-attributes={JSON.stringify(product.attributes)}
                                                        data-chosen={JSON.stringify(this.state.product_att)}
                                                    >ADD TO CART</button>
                                                </div>
                                                : null
                                            }
                                            <div className="description" dangerouslySetInnerHTML={{__html: product.description}}/>           
                                        </div>
                                    </Fragment>
                                    : null    
                            )
                            : null
                    )
                }
            </div>
        )
    }
};

export default Product;