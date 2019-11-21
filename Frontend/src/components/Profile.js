import React, {Component} from 'react'; 
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Profile.css';
import {Navbar} from "react-bootstrap";

//Define a Login Component
class Profile extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = { profiledata : [], year : "" };

        //Bind the handlers to this class
        this.firstnameChangeHandler  = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler  = this.lastnameChangeHandler.bind(this);
        this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    logout = () => {
        cookie.remove('cookie1', {path: '/'})
        cookie.remove('cookie2', {path: '/'})
        cookie.remove('cookie3', {path: '/'})
        console.log("All cookies removed!")
        window.location = "/"
    }

    componentWillMount(){
        if(cookie.load('cookie1')){
            var input_email = cookie.load('cookie2');
            console.log(input_email);
            const data = { email : input_email }
            axios.post('http://localhost:3001/homeaway/profile', data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        console.log(response.data)
                        this.setState({
                            profiledata : response.data
                            }
                        )
                        this.refs.myfirstname.value = this.state.profiledata[0].firstname;
                        this.state.firstname = this.state.profiledata[0].firstname;
                        this.refs.mylastname.value = this.state.profiledata[0].lastname;
                        this.state.lastname = this.state.profiledata[0].lastname;
                        this.refs.createdyear.value = this.state.profiledata[0].created;
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Cannot fetch details");
                    this.setState({
                        authFlag : false
                })
            });
        }
    }

    firstnameChangeHandler = (e) => {this.setState({firstname : e.target.value})}
    
    lastnameChangeHandler = (e) => {this.setState({lastname : e.target.value})}

    aboutmeChangeHandler = (e) => {this.setState({aboutMe : e.target.value})}

    cityChangeHandler = (e) => {this.setState({city : e.target.value})}

    stateChangeHandler = (e) => {this.setState({state : e.target.value})}

    countryChangeHandler = (e) => {this.setState({country : e.target.value})}

    companyChangeHandler = (e) => {this.setState({company : e.target.value})}

    schoolChangeHandler = (e) => {this.setState({school : e.target.value})}

    hometownChangeHandler = (e) => {this.setState({hometown : e.target.value})}

    genderChangeHandler = (e) => {this.setState({ gender: e.target.value })}
    
    phoneChangeHandler = (e) => {this.setState({ phone: e.target.value })}

    handleValidation(){
        let formIsValid = true;

        //firstname
        if(!this.state.firstname){
           formIsValid = false;
           alert("First Name is a Required field");
           console.log("First name cannot be empty");
        }

        //lastname
        if(!this.state.lastname){
            formIsValid = false;
            alert("Last Name is a Required field");
            console.log("Last name cannot be empty");
        }
        
       return formIsValid;
   }

    //submit Login handler to send a request to the node backend
    saveChanges(event) {
        console.log("Inside save form");
        //prevent page from refresh
        event.preventDefault();
        if(this.handleValidation()){
            console.log("Profile Form data submitted");
            var input_email = cookie.load('cookie2');
            console.log(input_email);
            const data = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                aboutMe : this.state.aboutMe,
                city : this.state.city,
                state : this.state.state,
                country : this.state.country,
                company : this.state.company,
                school : this.state.school,
                hometown : this.state.hometown,
                gender : this.state.gender,
                phone : this.state.phone,
                email : input_email,
            }
            
            console.log(data);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/homeaway/profilesave',data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if(response.status === 200){
                        console.log(response.data)
                        this.setState({profiledata : response.data})
                        alert("Profile Data was succesfully saved!");
                    }
                }) 
                .catch (error => {
                    console.log("Error is:", error);
                    alert ("Profile data save error!");
                });
        }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        console.log(cookie.load('cookie1'))
        if(!cookie.load('cookie1')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" title = "HomeAway" className = "logo"><img src={require('./homeaway_logo.png')} alt="Homeaway Logo"/></a>
                        </Navbar.Brand> 
                    </Navbar.Header>
                    <div>
                        {(cookie.load('cookie1') === 'travellercookie') 
                        ?
                        (
                        <div className="btn btn-group">
                            <button className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/traveller/mytrips">My Trips</a>
                                <a className="dropdown-item" href="/">Book My Trip</a>
                                <a className="dropdown-item" href="#" onClick= {this.logout}>Logout</a>
                            </div>
                        </div>
                        )
                        :
                        (
                        <div className="btn btn-group">
                            <button className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/owner/propertypost">Post Property</a>
                                <a className="dropdown-item" href="/owner/mylistings">My Listings</a>
                                <a className="dropdown-item" onClick = {this.logout}>Logout</a>
                            </div>
                        </div>
                        )
                    }
                    <img src={require('./logo.png')} alt="Homeaway Logo"/>
                    </div>
                </Navbar>
                <div class="container">
                <p></p>
                </div>
                <div class="image "></div>
                <div id = "profilehref" class="myprofilecontainer">
                    <div class="login-form">
                        <h1>{cookie.load('cookie3')}</h1>
                        <h2><small>Member since  <input id = "year" ref = "createdyear" type="text" readonly="readonly" /> </small></h2>
                        <h1><small>Profile Information</small></h1>
                        <br></br>
                            <div class="form-group">
                                    <input ref = "myfirstname" onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder="First Name" required/>
                                </div>
                                <div class="form-group">
                                    <input ref = "mylastname" onChange = {this.lastnameChangeHandler} type="text" class="form-control" name="lastname" placeholder="Last Name or Initial" required/>
                                </div>
                                <div class="form-group">
                                    <input style={{height : "100px"}} onChange = {this.aboutmeChangeHandler} type="text" class="form-control input-lg" name="aboutme" placeholder="About me"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.cityChangeHandler} type="text" class="form-control" name="city" placeholder="City"/>
                                </div>
                                <div class="form-group">
                                <select style={{width:"100%"}} onChange={this.stateChangeHandler}>
                                    <option style={{color: "#ccc",}} value="" hidden>State</option>
                                    <option value="Alabama">Alabama</option>
                                    <option value="Alaska">Alaska</option>
                                    <option value="Arizona">Arizona</option>
                                    <option value="Arkansas">Arkansas</option>
                                    <option value="California">California</option>
                                    <option value="Colorado">Colorado</option>
                                    <option value="Connecticut">Connecticut</option>
                                    <option value="Delaware">Delaware</option>
                                    <option value="District of Columbia">District of Columbia</option>
                                    <option value="Florida">Florida</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Hawaii">Hawaii</option>
                                    <option value="Idaho">Idaho</option>
                                    <option value="Illinois">Illinois</option>
                                    <option value="Indiana">Indiana</option>
                                    <option value="Iowa">Iowa</option>
                                    <option value="Kansas">Kansas</option>
                                    <option value="Kentucky">Kentucky</option>
                                    <option value="Louisiana">Louisiana</option>
                                    <option value="Maine">Maine</option>
                                    <option value="Maryland">Maryland</option>
                                    <option value="Massachusetts">Massachusetts</option>
                                    <option value="Michigan">Michigan</option>
                                    <option value="Minnesota">Minnesota</option>
                                    <option value="Mississippi">Mississippi</option>
                                    <option value="Missouri">Missouri</option>
                                    <option value="Montana">Montana</option>
                                    <option value="Nebraska">Nebraska</option>
                                    <option value="Nevada">Nevada</option>
                                    <option value="New Hampshire">New Hampshire</option>
                                    <option value="New Jersey">New Jersey</option>
                                    <option value="New Mexico">New Mexico</option>
                                    <option value="New York">New York</option>
                                    <option value="North Carolina">North Carolina</option>
                                    <option value="North Dakota">North Dakota</option>
                                    <option value="Northern Marianas Islands">Northern Marianas Islands</option>
                                    <option value="Ohio">Ohio</option><option value="Oklahoma">Oklahoma</option>
                                    <option value="Oregon">Oregon</option>
                                    <option value="Pennsylvania">Pennsylvania</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Rhode Island">Rhode Island</option>
                                    <option value="South Carolina">South Carolina</option>
                                    <option value="South Dakota">South Dakota</option>
                                    <option value="Tennessee">Tennessee</option>
                                    <option value="Texas">Texas</option>
                                    <option value="Utah">Utah</option>
                                    <option value="Vermont">Vermont</option>
                                    <option value="Virginia">Virginia</option>
                                    <option value="Virgin Islands">Virgin Islands</option>
                                    <option value="Washington">Washington</option>
                                    <option value="West Virginia">West Virginia</option>
                                    <option value="Wisconsin">Wisconsin</option>
                                    <option value="Wyoming">Wyoming</option>
                                </select><br/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.countryChangeHandler} type="text" class="form-control" name="country" placeholder="Country"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.companyChangeHandler} type="text" class="form-control" name="company" placeholder="Company"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.schoolChangeHandler} type="text" class="form-control" name="school" placeholder="School"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.hometownChangeHandler} type="text" class="form-control" name="hometown" placeholder="Hometown"/>
                                </div>
                                <div class="form-group">
                                <select value={this.state.gender} style={{width:"100%"}} onChange={this.genderChangeHandler}>
                                    <option style={{color: "#ccc",}} value="" hidden>Gender</option>
                                    <option name="male"> Male</option>
                                    <option name="female">Female</option>
                                    <option name="other">Other</option>
                                </select><br/>
                                <h6 align = "left"><small>This is never shared</small></h6>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone Number"/>
                                </div>
                            </div>  
                        <br></br>
                        <div class="col-md-10 text-center"> 
                        <button onClick = {this.saveChanges} class="btn-primary btn-lg" >Save Changes</button>
                        </div>
                        <br/>
                        </div>
            </div>
        )
    }
}
//export Login Component
export default Profile;