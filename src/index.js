import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/navbar';
import Login from './components/login/login';
import AdminDashboard from './components/admin/admindashboard';
import {Route,Link,BrowserRouter as Router} from 'react-router-dom';
import AddProducts from './components/admin/addproducts';
import ViewProducts from './components/admin/viewproducts';
import Test from './components/test';
import EachProduct from './components/admin/eachproduct';
import Shop from './components/shop/main';
import SelectUser from './components/login/selectuser';
import Register from './components/login/register';
import Cart from './components/cart/index';

// ReactDOM.render(<NavBar/>, document.getElementById('nav-bar'));

// ReactDOM.render(<TestKey/>,document.getElementById('test-key'));

serviceWorker.unregister();

const routing=(
    <Router>
        <div>

            <Route path="/" component={NavBar}/>
            <Route path="/home" component={App}/>
            <Route path="/admin" component={AdminDashboard}/>
            <Route path="/addProducts" component={AddProducts}/>
            <Route path="/viewProducts" component={ViewProducts}/>
            <Route path="/eachproduct" component={EachProduct}/>
            <Route path="/shop" component={Shop}/>
            <Route path="/login" component={SelectUser}/>
            <Route path="/register" component={Register}/>
            <Route path="/cart" component={Cart}/>

        </div>
    </Router>
)

ReactDOM.render(routing,document.getElementById('root'));