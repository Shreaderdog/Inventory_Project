import React, { Component } from "react";
import Product from './Product/Product';
import Navigation from "./../Navigation/Navigation";
import Footer from "./../Footer/Footer";
import { Container } from "react-bootstrap";
import API from '../../api';

export default class Products extends Component {
    
    constructor(props) {
        super(props);
        this.state={perms: {}, items: {}};
    }

    componentDidMount() {
        API.get('/users/info', {withCredentials: true})
            .then(res => {
                if (res.data.role) {
                    this.setState({
                        perms: {
                            role: res.data.role,
                            store: res.data.store
                        }
                    });
                }
                if (this.state.perms.role == "owner"){
                    API.get('/products/storeall', {withCredentials: true})
                        .then(res => {
                            this.setState({
                                items: res.data
                            })
                        })
                } else {
                    API.get(`/products/store${this.state.perms.store}`, {withCredentials: true})
                        .then(res => {
                            this.setState({
                                items: res.data
                            })
                        })
                }
            });
        
    }
    
    render() {
        return (
        <>
            <Navigation />
            <Container fluid className="h-100 w-100">
                <div className="row align-items-center">
                    <div className = "col align-self-center">
                        <h1 style={{textAlign: "center"}}> Select a tab above to get started</h1>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
        );
    }
}