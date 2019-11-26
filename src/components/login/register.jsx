import React, { Component } from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            password:""
        }
    }
    handleChange=(event)=>{
        var name=event.target.name;
        var value=event.target.value;
        this.setState({[name]:value});
        console.log(name,value);
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        var users=JSON.parse(localStorage.getItem("Users"));
        console.log("data:",users);
        if(users===null){
            localStorage.setItem("Users",JSON.stringify(this.state));
        }
        else{
            var temp=[];
            users.map(user=>temp.push(user));
            temp.push(this.state);
            (localStorage.setItem("Users",JSON.stringify(temp)));

        }
        console.log(this.state);
    }
   render() { 
        return (  
            <form className="form" onSubmit={this.handleSubmit}>
            <br></br>
            <h2><b><center>Register</center></b></h2><br></br>
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              className="textbox"
              name="username"
              placeholder="Enter username"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <label>
              <b>Email</b>
            </label>
            <input
              type="email"
              className="textbox"
              name="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              className="textbox"
              name="password"
              placeholder="Enter password"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <br></br>
            <br></br>
            <input type="submit" className="button" id="registerBtn"
              value="Register"></input>
           
          </form>
        );
    }
}
 
export default Register;