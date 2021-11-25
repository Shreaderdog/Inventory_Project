// navigation.jsx
import { Container, Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from '../../api';
import './Navigation.css';

const Navigation = () => {

    const history = useHistory();
    const [state, setState] = useState({username: "jdoe", fname: "john", lname: "doe", store: "0", role: "employee"});

    async function logout() {
        API.delete('/users/logout', {withCredentials: true})
            .then(res => {
                console.log(res)
                history.push('/login')
            })

    }

    useEffect(() => {
        API.get('users/info', {withCredentials: true})
            .then(res => {
                if(res.data.role) {
                    setState({
                        username: res.data.username,
                        fname: res.data.fName,
                        lname: res.data.lName,
                        role: res.data.role,
                        store: res.data.store
                    });
                }
            })
    }, [])

    return (
        <Navbar style={{paddingLeft: "20px", backgroundColor: "lightgray"}}>
            <Container fluid>
            <Navbar.Brand href="/dashboard">Misfits Inventory Management</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link style={{color: "green"}} href="/dashboard">Dashboard</Nav.Link>
                {state.role == "owner"
                ? <><Nav.Link style={{color: "green"}} href="/products:1">Store 1</Nav.Link>
                  <Nav.Link style={{color: "green"}} href="/products:2">Store 2</Nav.Link>
                  <Nav.Link style={{color: "green"}} href="/products:3">Store 3</Nav.Link>
                  <Nav.Link style={{color: "green"}} href="/additem">Add Items</Nav.Link>
                  <Nav.Link style={{color: "green"}} href="/register">Register User</Nav.Link></>:
                <Nav.Link style={{color: "green"}} href={"/products:" + state.store}>Store {state.store}</Nav.Link>}
                <Nav.Link style={{position: "fixed", right: "30px", color: "green"}} onClick={logout}>Logout</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;