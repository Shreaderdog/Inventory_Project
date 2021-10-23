import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ='/'>
          <Redirect to='/login'/>
        </Route>
        <Route component={Products} exact path='/products'/>
        <Route component={Dashboard} exact path='/dashboard'/>
        <Route component={Login} exact path='/login'/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
