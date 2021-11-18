import React, { Component } from "react";
import Product from './Product/Product';
import Navigation from "./../Navigation/Navigation";
import Footer from "./../Footer/Footer";
import { Container } from "react-bootstrap";
import API from '../../api';
import './Products.css';

export default class Products extends Component {
    
    constructor(props) {
        super(props);
        this.state={perms: {}, items: []};
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
                    API.get(`/products/store${this.state.perms.store}`, {withCredentials: true})
                        .then(res => {
                            this.setState({
                                items: res.data
                            })
                        })
            });
        
    }
    
    render() {
        return (
        <>
            <Navigation />
            <Container fluid className="h-100 w-100 centered ">
                <div className="row align-items-center">
                    <div className = "mt-4 col align-self-center border border-secondary rounded-2 border-3">
                        {this.state.items.map((item, i) => <Product key={i} propitem={item} propperm={this.state.perms}/>)}
                    </div>
                </div>
            </Container>
            <Footer />
        </>
        );
    }
}