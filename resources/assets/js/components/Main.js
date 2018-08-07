import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from '../components/Product';
import AddProduct from '../components/AddProduct';

export default class Main extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            currentProduct: null
        }
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }


    handleAddProduct(product) {
        product.price = Number(product.price);
        fetch( 'api/products/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(product)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {
                this.setState((prevState)=> ({
                    products: prevState.products.concat(data),
                    currentProduct : data
                }))
            })

    }
    componentDidMount() {

        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                this.setState({ products });
            });
    }

    renderProducts() {
        return this.state.products.map((product, index) => {
            return (
                    <li key={index} className="list-group-item " onClick={
                        () =>this.handleClick(product)}  >
                        { product.title }
                    </li>
                   );
            })
    }


    handleClick(product) {
        this.setState({currentProduct:product});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 allProducts">
                    <h3> All products  which are available </h3>
                    <ul className="list-group list-group-flush">
                        { this.renderProducts() }
                    </ul>
                </div>
                <div className="col-md-8 ">
                    <Product product={this.state.currentProduct}  object={this} />
                    <AddProduct onAdd={this.handleAddProduct} />
                </div>

            </div>
        );
    }

}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}

