// App.js
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Additem from './components/Additem/Additem';
import Register from './components/Register/Register';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path ='/'>
          <Redirect to='/login'/>
        </Route>
        <Route component={Products} exact path='/products:id'/>
        <Route component={Dashboard} exact path='/dashboard'/>
        <Route component={Login} exact path='/login'/>
        <Route component={Additem} exact path='/additem'/>
        <Route component={Register} exact path='/register'/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
