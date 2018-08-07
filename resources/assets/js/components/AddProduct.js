import React, { Component } from 'react';

class AddProduct extends Component {

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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {

        var state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({newProduct: state });
    }

    handleSubmit(e) {
        //preventDefault prevents page reload
        e.preventDefault();
       if(this.state.newProduct.title === "" && this.state.newProduct.description === ""  ){
           return false;
       }else{
           this.props.onAdd(this.state.newProduct);
       }

    }

    render() {

        return(
            <div>
                <h2> Add new product </h2>
                <div >
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text"  id="title" onChange={(e)=>this.handleInput('title',e)}  className="form-control"/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">$</span>
                            </div>
                            <input type="text" className="form-control" onChange={(e)=>this.handleInput('price',e)} aria-label="Amount (to the nearest dollar)"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Example textarea</label>
                            <textarea className="form-control" type="text" onChange={(e)=>this.handleInput('description',e)} id="description" rows="3"></textarea>
                        </div>
                            <input type="submit" className="btn btn-outline-success" value="Submit" />
                    </form>
                </div>
            </div>)
    }
}

export default AddProduct;