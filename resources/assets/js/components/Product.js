import React, { Component } from 'react';
import UpdateProduct from '../components/UpdateProduct';

 class Product extends Component {
    constructor(props) {
        super(props);
    }


     handleDelete(product ,object) {
      const self = object;
       const currentProduct = product;
    fetch( 'api/products/' + currentProduct.id,
        { method: 'delete' })
        .then(response => {
            let array = self.state.products.filter(function(item) {
                return item !== currentProduct;
            });

             self.setState({ products: array, currentProduct: null});
        });
}
    render(){
        return(
            <div>

                {this.props.product === null ? "" : <h3> {this.props.product.title}</h3>}
                {this.props.product === null ? "" :  <p> {this.props.product.description} </p>}
                {this.props.product === null ? "" : <h3> Price : {this.props.product.price} </h3>}
                {this.props.product === null ? "" : <ul className="nav nav-pills">
                                                       <li key={this.props.product.title} ><button
                                                           onClick={this.handleDelete.bind(this,this.props.product,this.props.object)}
                                                           type="button" className="btn btn-primary" >Delete
                                                       </button></li>
                                                        <li key={this.props.product.price}><UpdateProduct product={this.props.product}
                                                                           object={this.props.object} /></li>
                                                   </ul>}


            </div>)
        }
}


 export default Product;
