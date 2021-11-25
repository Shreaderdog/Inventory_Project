import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Navigation from "./../Navigation/Navigation";
import Footer from "./../Footer/Footer";
import API from '../../api';

class Additem extends Component {
    
    constructor(props) {
        super(props);
        this.state={role: "", prodNumber: "", prodName: "", prodPrice: "", unitAmount: ""};
    }

    componentDidMount() {
        API.get('/users/info', {withCredentials: true})
            .then(res => {
                console.log(res)
                if (res.data.role) {
                    this.setState({role: res.data.role})
                }
            }
        )
    }

    additem() {
        let item = {
            prodNumber: this.state.prodNumber,
            prodName: this.state.prodName,
            prodPrice: this.state.prodPrice,
            unitAmount: this.state.unitAmount
        }
        API.post('/products/additem', {item}, {withCredentials: true})
            .then(res => {
                console.log(res)
            })
    }

    render() {
        return (
            <>
                <Navigation />
                {this.state.role == "owner"
                ? <>
                    <Form className= "mt-2 mb-2 centeritems">
                        <Form.Group>
                        <Form.Label htmlFor="prodNum">Product Number:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="prodNum" onChange={e => this.setState({ prodNumber: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="prodName">Product Name:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="prodName" onChange={e => this.setState({ prodName: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="prodPrice">Product Price:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="prodPrice" onChange={e => this.setState({ prodPrice: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="unitAmnt">Unit Amount:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="unitAmnt" onChange={e => this.setState({ unitAmount: e.target.value })}/>
                        </Form.Group>
                        <Button className="btn" onClick={this.additem.bind(this)}>Add Item</Button>
                    </Form>
                  </>: <p>You do not have access to add items.</p>}
                <Footer />
            </>
        )
    }
}

export default Additem;