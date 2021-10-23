import { useHistory } from 'react-router';
import { useEffect } from 'react';

import API from '../../api';

export default function Login() {
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        };

        API.post('users/login', {user}, {withCredentials: true});
    }

    useEffect(() => {
        let x = {};
        API.post('users/auth', {x}, {withCredentials: true})
        .then(res =>{
            console.log(res);
            if(res.data.isLoggedIn) {
                history.push("/dashboard");
            }
        })
    }, [history]);

    return (
        <form onSubmit={event => handleLogin(event)}>
            <input required type="text"/>
            <input required type="password"/>
            <input type="submit" value="Submit"/>
        </form>
    )
}