import React, { Component } from "react";
import { withRouter } from "react-router";
import Product from './Product/Product';
import Navigation from "./../Navigation/Navigation";
import Footer from "./../Footer/Footer";
import { Container } from "react-bootstrap";
import API from '../../api';
import './Products.css';

class Products extends Component {
    
    constructor(props) {
        super(props);
        let storevar = this.props.match.params.id;
        storevar = storevar.slice(1);
        this.state={perms: {role: "", store: storevar, userstore: ""}, items: []};
    }

    componentDidMount() {
        API.get('/users/info', {withCredentials: true})
            .then(res => {
                if (res.data.role) {
                    this.setState(prevState => {
                        let perms = {
                            store: prevState.perms.store,
                            role: res.data.role,
                            userstore: res.data.store
                        }
                        return { perms };
                    });
                    
                }})
                .then(                    
                 API.get(`/products/store${this.state.perms.store}`, {withCredentials: true})
                .then(res => {
                    this.setState({
                        items: res.data
                    })
                }))
                
            }

    updateData() {
        API.get(`products/store${this.state.perms.store}`, {withCredentials:true})
            .then(res => {
                this.setState({
                    items: res.data
                })
            })
    }
    
    render() {
        return (
            <>
            {this.state.perms.userstore == this.state.store || this.state.perms.role == "owner" ?
                <>
                <Navigation />
                <Container fluid className="h-100 w-100 centered ">
                    <div className="row align-items-center">
                        <div className = "mt-4 col align-self-center border border-secondary rounded-2 border-3">
                            {this.state.items.map((item, i) => <Product key={i} propitem={item} propfunc = {this.updateData} propperm={this.state.perms}/>)}
                        </div>
                    </div>
                </Container>
                <Footer />
            </>: <p>Sorry, you are not allowed to access this store</p>}
        </>
        );
    }
}

export default withRouter(Products);