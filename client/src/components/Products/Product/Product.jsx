import React, { Component } from "react";
import { Button } from "react-bootstrap";
import API from '../../../api';
import './Product.css';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state={role: props.propperm.role, store: props.propperm.store, item: props.propitem, updatefunc: props.propfunc}
    }

    handlenameupdate(e) {
        this.setState(prevState => {
            let middleman = Object.assign({}, prevState.item);
            middleman.prodName = e.target.value;
            let item = Object.assign({}, middleman);
            return { item };
        })
    }

    handlepriceupdate(e) {
        this.setState(prevState => {
            let middleman = Object.assign({}, prevState.item);
            middleman.prodPrice = e.target.value.toString();
            let item = Object.assign({}, middleman);
            return { item };
        })
    }

    handlestockupdate(e) {
        this.setState(prevState => {
            let middleman = Object.assign({}, prevState.item);
            middleman.stock = e.target.value.toString();
            let item = Object.assign({}, middleman);
            return { item };
        })
    }

    sendupdate() {
        API.patch('/products/edititem', this.state, {withCredentials: true})
            .then(res => {
                this.state.updatefunc();
            })
    }

    delitem() {
        API.delete('/products/removeitem', this.state, {withCredentials:true})
            .then(res => {
                this.state.updatefunc();
            })
    }

    render() {
        return (
            <form className="form-inline mt-2 mb-2 centeritems">
            <label htmlFor="prodNum">Product Number:  </label>
            <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodNum" defaultValue={this.state.item.prodNumber} plaintext readOnly/>
            <label htmlFor="prodName">Product name:  </label>
            {this.state.role == "owner"
            ? <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodName" placeholder={this.state.item.prodName} onChange={e => this.handlenameupdate(e)}/>: 
            <input type="text" className="form-control mb-2 mr-sm-2 ml-4" id="prodName" placeholder={this.state.item.prodName} plaintext readOnly/>}
            <label htmlFor="prodPrice">Price:  </label>
            {this.state.role == "owner"
            ? <input type="number" className="form-control mb-2 mr-sm-2 ml-4" id="prodPrice" placeholder={this.state.item.prodPrice} onChange={e => this.handlepriceupdate(e)}/>:
            <input type="number" className="form-control mb-2 mr-sm-2 ml-4" id="prodPrice" placeholder={this.state.item.prodPrice} plaintext readOnly/>}
            <label htmlFor="prodStock">Stock:  </label>
            {this.state.role == "owner" || this.state.role == "manager"
            ? <input type="number" className="form-control mb-2 mr-sm-2 ml-4" id="prodStock" placeholder={this.state.item.stock} onChange={e => this.handlestockupdate(e)}/>: 
            <input type="number" className="form-control mb-2 mr-sm-2 ml-4" id="prodStock" placeholder={this.state.item.stock} plaintext readOnly/>}
            {this.state.role == "owner" || this.state.role == "manager"
            ? <Button className="btn mb-2 mr-sm-2 ml-4" onClick={this.sendupdate.bind(this)}>Edit Item</Button>: null}
            {this.state.role == "owner"
            ? <Button className="btn mb-2 mr-sm-2 ml-4" onClick={this.delitem.bind(this)}>Delete Item</Button>: null}
        </form>
        )
    }
}