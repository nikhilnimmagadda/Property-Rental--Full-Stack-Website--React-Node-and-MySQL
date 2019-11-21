import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './OwnerLogin.css';
import './bootstrap-social.css';
import {Navbar} from "react-bootstrap";

//Define a Signup2 Component
class Signup2 extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //first name change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }
    //last name change handler to update state variable with the text entered by the user
    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value
        })
    }
    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    handleValidation(){
        let formIsValid = true;

        //Firstname
        if(!this.state.firstname){
            formIsValid = false;
            alert("First Name is a Required field");
            console.log("First Name cannot be empty");
        } else if(typeof this.state.firstname !== "undefined"){
            if(!this.state.firstname.match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                alert("First Name cannot contain numbers");
                console.log("First Name cannot contain numbers");
            }        
        }
        //Lastname
        if(!this.state.lastname){
            formIsValid = false;
            alert("Last Name is a Required field");
            console.log("Last Name cannot be empty");
         } else if(typeof this.state.lastname !== "undefined"){
            if(!this.state.lastname.match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                alert("Last Name cannot contain numbers");
                console.log("Last Name cannot contain numbers");
            }        
        }
        //Password
        if(!this.state.password){
            formIsValid = false;
            alert("Password is a Required field");
            console.log("Password cannot be empty");
        }
        //Email
        if(!this.state.email){
           formIsValid = false;
           alert("Login ID is a Required field");
           console.log("Login ID cannot be empty");
        }
        if(typeof this.state.email !== "undefined"){
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
               formIsValid = false;
               alert("Login ID is invalid");
               console.log("Email ID is not Valid");
             }
        }  
 
       return formIsValid;
   }

    //submit Login handler to send a request to the node backend
    submitLogin(event) {
        console.log("Inside submit login");
        //prevent page from refresh
        event.preventDefault();
        if(this.handleValidation()){
            const data = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                email : this.state.email,
                password : this.state.password
            }
            
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/homeaway/owner/signup',data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if(response.status === 200){
                        this.setState({
                            authFlag : true
                        })
                        alert ("Owner profile created")
                    }
                    if(response.status === 201){
                        this.setState({
                            authFlag : true
                        })
                        alert ("Owner profile added to Traveler login. You can now use the same login details ")
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Cannot Create User. Login ID already exists");
                    this.setState({
                        authFlag : false
                })
            });
        }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        cookie.load('cookie1');
        if(cookie.load('cookie1') === 'ownercookie'){
            redirectVar = <Redirect to= "/owner/propertypost"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" title = "HomeAway" className = "logo"><img src={require('./homeaway_logo.png')} alt="Homeaway Logo"/></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <img src={require('./logo.png')} alt="Homeaway Logo"/>
                </Navbar>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="center">
                    <div id="yourdiv">
                        <h1 class="display-5">Sign Up for HomeAway<br></br></h1>
                        <h2><small>	Already have an account? <a class="bg-default" href="/owner/login">Log in</a></small></h2>
                    </div>
                </div>
                <div class="container">
                 <div class="col-sm-6" style={{width: "35%", left: "350px"}}>
                        <div class="login-form">
                            <br></br>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder="First Name"/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input onChange = {this.lastnameChangeHandler} type="text" class="form-control" name="lastname" placeholder="Last Name"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email Address"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div>
                                <button onClick = {this.submitLogin} class="btn btn-warning" style={{width:"100%"}}>Sign me Up</button>
                            </div>
                        </div>
                        <div class="mydiv"><span class="myspan">or</span></div>
                        <br></br>
                        <div>
                            <button class="mybtn facebook_button">Log in with Facebook</button>
                        </div>
                        <br></br>
                        <div>
                            <button className="mybtn google_button" >Log in with Google</button>
                        </div>
                        <br></br>
                        <div class="center" id= "yourdiv">
                            <font size="1">We don't post anything without your permission.
                            <br></br>
                            By creating an account you are accepting our Terms and Conditions and Privacy Policy.
                            <br></br>
                            </font>
                        </div>
                        <br></br>
                        </div>
                </div>
                <br></br>
                <div class="center" id= "yourdiv">
                <font size="1">Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.
                <br></br>
                ©2018 HomeAway. All rights reserved.</font>
                </div>
            </div>
        )
    }
}
//export Signup2 Component
export default Signup2;