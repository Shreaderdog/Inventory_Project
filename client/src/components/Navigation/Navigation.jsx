// navigation.jsx
import { Container, Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from '../../api';
import './Navigation.css';

const Navigation = () => {

    const history = useHistory();
    const [state, setState] = useState({username: "jdoe", fname: "john", lname: "doe", store: "1", role: "employee"});

    async function logout() {
        API.delete('/users/logout');
        await history.push('/login');
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
                    console.log("test")
                }
            })
    }, [])

    return (
        <Navbar style={{paddingLeft: "20px", backgroundColor: "lightgray"}}>
            <Container fluid>
            <Navbar.Brand href="/dashboard">Misfits Inventory Management</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link style={{color: "green"}} href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link style={{color: "green"}} href="/products">Store {state.store}</Nav.Link>
                {state.role == "owner"
                ? <Nav.Link href="/register">Register User</Nav.Link>: null}
                <Nav.Link style={{position: "fixed", right: "30px", color: "green"}} href="/login" onClick={logout}>Logout</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;