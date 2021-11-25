import { React, Component } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import API from "../../api";
import { Button, Form } from "react-bootstrap";


class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state={urole: "", employeeNum: "", username: "", password: "", fName: "", lName: "", role: "", store: ""};
    }

    componentDidMount() {
        API.get('/users/info', {withCredentials:true})
            .then(res => {
                if (res.data.role) {
                    this.setState({
                        urole: res.data.role
                    })
                }
            }
        )
    }

    reguser() {
        let user = {
            employeeNum: this.state.employeeNum,
            username: this.state.username,
            password: this.state.password,
            fName: this.state.fName,
            lName: this.state.lName,
            role: this.state.role,
            store: this.state.store
        }
        API.post('/users/register', {user}, {withCredentials:true})
    }

    render() {
        return (
            <>
                <Navigation />
                {this.state.urole == "owner"
                ? <>
                    <Form className= "mt-2 mb-2 centeritems">
                        <Form.Group>
                        <Form.Label htmlFor="EmpNum">Employee Number:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="EmpNum" onChange={e => this.setState({ employeeNum: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="userName">Username:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="userName" onChange={e => this.setState({ username: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="pass">Password:  </Form.Label>
                        <Form.Control type="password" className="form-control mb-2 mr-sm-2ml-4" id="pass" onChange={e => this.setState({ password: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="fName">First Name:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="fName" onChange={e => this.setState({ fName: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="lName">Last Name:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="lName" onChange={e => this.setState({ lName: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="role">Role:  </Form.Label>
                        <Form.Select className="form-control mb-2 mr-sm-2ml-4" id="role" onChange={e => this.setState({ role: e.target.value })}>
                            <option value="owner">owner</option>
                            <option value="manager">manager</option>
                            <option value="worker">worker</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="store">Store:  </Form.Label>
                        <Form.Control type="text" className="form-control mb-2 mr-sm-2ml-4" id="store" onChange={e => this.setState({ store: e.target.value })}/>
                        </Form.Group>
                        <Button className="btn" onClick={this.reguser.bind(this)}>Add User</Button>
                    </Form>
                  </>: <p>You do not have access to add users.</p>}
                <Footer />
            </>
        )
    }
}

export default Register;