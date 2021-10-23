import {Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path='/login'/>
        <Route component={Dashboard} exact path='/dashboard'/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
