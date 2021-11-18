import React, { Component } from "react";
import { Button,  } from "react-bootstrap";
import API from '../../../api';
import './Product.css';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state={role: props.propperm.role, store: props.propperm.store, item: props.propitem}
    }

    handleupdate() {
        console.log("transmat firing");
    }

    render() {
        return (
            <form className="form-inline mt-2 mb-2 centeritems">
            <label htmlFor="prodName">Product name:  </label>
            {this.state.role == "owner"
            ? <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodName" placeholder={this.state.item.prodName}/>: 
            <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodName" placeholder={this.state.item.prodName} readOnly/>}
            <label htmlFor="prodPrice">Price:  </label>
            {this.state.role == "owner"
            ? <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodPrice" placeholder={this.state.item.prodPrice}/>:
            <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodPrice" placeholder={this.state.item.prodPrice} readOnly/>}
            <label htmlFor="prodStock">Stock:  </label>
            {this.state.role == "owner"
            ? <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodStock" placeholder={this.state.item.stock}/>: 
            <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodStock" placeholder={this.state.item.stock} readOnly/>}
            {this.state.role == "owner"
            ? <Button className="btn" onClick={this.handleupdate}>Edit Item</Button>: null}
        </form>
        )
    }
}