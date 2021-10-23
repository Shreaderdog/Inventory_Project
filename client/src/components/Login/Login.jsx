import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

import API from '../../api';
import { Container, Button, Form } from 'react-bootstrap';
import './Login.css';
import Footer from '../Footer/Footer';

export default function Login() {
    const history = useHistory();
    const [state, setState] = useState({username: "", password: ""});

    function handleLogin(e) {
        e.preventDefault();

        const user = {
            username: state.username,
            password: state.password
        };

        API.post('users/login', {user}, {withCredentials: true})
            .then(res =>{
                if(res.data.isLoggedIn) {
                    history.push("/dashboard");
                }
            })
    }

    useEffect(() => {
        let x = {};
        API.post('users/auth', {x}, {withCredentials: true})
        .then(res =>{
            console.log(res);
            console.log(res.data.isLoggedIn);
            if(res.data.isLoggedIn) {
                history.push("/dashboard");
            }
        })
    }, [history]);

    return (
        <Container>
            <h1 className="title">Misfit Inventory Management System</h1>
            <Form className="Login align-middle" style={{boxShadow: "1px 1px 1px 1px lightGrey", borderRadius: "10px"}}>
            
            <h2 className="text-center">Welcome</h2>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={e => setState(prevState =>{{return {username: e.target.value, password: prevState.password}}})} type="test" placeholder="username" style={{boxShadow: "1px 1px 1px 1px lightGrey", borderRadius: "10px"}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={e => setState(prevState =>{{return {username: prevState.username, password: e.target.value}}})} type="password" placeholder="password" style={{boxShadow: "1px 1px 1px 1px lightGrey", borderRadius: "10px"}}/>
            </Form.Group>
            <Button className="btn btn-lg w-100" style={{marginTop: "8px", background: "green"}} onClick={handleLogin}>Log in</Button>
        </Form>
        <Footer />
        </Container>


        /*<Container>
            <Footer />
        </Container>*/
    )
}