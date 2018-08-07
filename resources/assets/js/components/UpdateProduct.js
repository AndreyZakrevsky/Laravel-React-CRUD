import React, { Component } from 'react';

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({newProduct: state });
    }

    handleUpdate(product ,object){
        const currentProduct = this.state.newProduct;
        const self = object;
        fetch( 'api/products/' +product.id, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.newProduct)
        })
            .then( data => {
                var array = self.state.products.filter(function(item) {
                        return item !== product
                    })
                self.setState({ products: array.concat(currentProduct),
                               currentProduct: null});

            })
    }
    render(){
        return(
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Update
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                        <div className="form-group">
                                            <label htmlFor="title1">Title</label>
                                            <input type="text"  id="title1" onChange={(e)=>this.handleInput('title',e)}  className="form-control"/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">$</span>
                                            </div>
                                            <input type="text" className="form-control" onChange={(e)=>this.handleInput('price',e)} aria-label="Amount (to the nearest dollar)"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description1">Example textarea</label>
                                            <textarea className="form-control" type="text" onChange={(e)=>this.handleInput('description',e)} id="description1" rows="3"></textarea>
                                        </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleUpdate.bind(this, this.props.product, this.props.object)} type="button" className="btn btn-secondary" data-dismiss="modal">Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)
    }
}


export default UpdateProduct;
