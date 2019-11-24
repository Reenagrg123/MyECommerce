import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/navbar';
import Login from './components/login';
import AdminDashboard from './components/admindashboard';
import {Route,Link,BrowserRouter as Router} from 'react-router-dom';
import AddProducts from './components/addproducts';
import ViewProducts from './components/viewproducts';
import Test from './components/test';
import EachProduct from './components/eachproduct';

// ReactDOM.render(<NavBar/>, document.getElementById('nav-bar'));

// ReactDOM.render(<TestKey/>,document.getElementById('test-key'));

serviceWorker.unregister();

const routing=(
    <Router>
        <div>

            <Route path="/" component={NavBar}/>
            <Route path="/home" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/admin" component={AdminDashboard}/>
            <Route path="/addProducts" component={AddProducts}/>
            <Route path="/viewProducts" component={ViewProducts}/>
            <Route path="/eachproduct" component={EachProduct}/>

        </div>
    </Router>
)

ReactDOM.render(routing,document.getElementById('root'));