import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from "react-bootstrap";
import './home.css';
import Background from './homepage_background.png'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      isTravelerLoggedIn: false,
      backgroundImage: `url(${Background})`,
      searchLocation: "",
      fromDate: new Date(),
      toDate: new Date(),
      guests: 0,
    };
    this.searchLocationChangeHandler = this.searchLocationChangeHandler.bind(this);
    this.fromDateChangeHandler = this.fromDateChangeHandler.bind(this);
    this.toDateChangeHandler = this.toDateChangeHandler.bind(this);
    this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    this.searchProperty = this.searchProperty.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    cookie.remove('cookie1', {path: '/'})
    cookie.remove('cookie2', {path: '/'})
    cookie.remove('cookie3', {path: '/'})
    console.log("All cookies removed!")
    window.location = "/"
  }

  onChangeArrive = date => this.setState({ fromDate: date })
  onChangeDepart = date => this.setState({ toDate: date })

  //search searchLocation change handler to update state variable with the text entered by the user
  searchLocationChangeHandler = (e) => {
    this.setState({
      searchLocation : e.target.value
    })
  }

  //From date change handler to update state variable with the text entered by the user
  fromDateChangeHandler = (e) => {
      this.setState({
          fromDate : e.target.value
      })
  }
  
  //To date change handler to update state variable with the text entered by the user
  toDateChangeHandler = (e) => {
    this.setState({
        toDate : e.target.value
    })
  }

  //Number of guests change handler to update state variable with the text entered by the user
  guestsChangeHandler = (e) => {
    this.setState({
        guests : e.target.value
    })
  }

  handleValidation(){
    let formIsValid = true;

    //Location
    if(!this.state.searchLocation){
        formIsValid = false;
        alert("Search Location is a Required field");
        console.log("Search LOcation cannot be empty");
    }

    console.log(this.state.fromDate);
    //From Date
    if(!this.state.fromDate){
      formIsValid = false;
      alert("From Date is a Required field");
      console.log("From Date cannot be empty");
    } else {
      var CurrentDate = new Date();
      CurrentDate.setHours(0,0,0,0);
      var GivenfromDate = new Date(this.state.fromDate.replace(/-/g, '\/'));
      if(GivenfromDate < CurrentDate){
        alert('From date should be greater than the current date.');
        formIsValid = false;
      }
    }

    //To Date
    if(!this.state.toDate){
        formIsValid = false;
        alert("To Date is a Required field");
        console.log("To Date cannot be empty");
     } else {
      var CurrentDate = new Date();
      CurrentDate.setHours(0,0,0,0);
      var GiventoDate = new Date(this.state.toDate.replace(/-/g, '\/'));

      if(GiventoDate < CurrentDate){
        alert('To date should be greater than the current date.');
        formIsValid = false;
      } else {
        if (GiventoDate <= GivenfromDate){
          alert('To date should be greater than from date.');
          formIsValid = false;
        }
      }
    }

     //Numberof guests
    if(!this.state.guests){
      formIsValid = false;
      alert("Number of guests is a Required field");
      console.log("No. of Guests cannot be empty");
    }
   return formIsValid;
}

  //searchProperty handler to send a request to the node backend
  searchProperty(event) {
    console.log("Inside search Property");
    //prevent page from refresh
    event.preventDefault();
    if(this.handleValidation()){
      this.props.history.push({
        pathname: '/property/searchresult',
        state: { location: this.state.searchLocation, 
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                noOfGuests: this.state.guests}
      })
    }
  }

  render(){
    let redirectVar = null;
    if(cookie.load('cookie1')){
      this.state.isTravelerLoggedIn = true
    } else {
      redirectVar = <Redirect to = "/"/>
    }
    return(
      <div style={{height:"800px", backgroundImage: this.state.backgroundImage}}>
      {redirectVar}
        <Navbar style = {{backgroundColor: "transparent", background: "transparent", borderColor: "transparent"}}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/" title = "HomeAway" className = "logo"><img alt="Homeaway White Logo" src={require('./homeaway_white.svg')}/></a>
            </Navbar.Brand>
          </Navbar.Header>
          <div>
            <img alt="US Flag" src={require('./us_flag.png')}/>
            <button className="btn" style = {{fontColor : "#0067db", backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button">Trip Boards</button>
            {console.log(this.state.isTravelerLoggedIn )}
            {!this.state.isTravelerLoggedIn 
              ?
              (
                <div className="btn btn-group">
                  <button id="white" className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Login</button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/traveller/login">Traveller Login</a>
                    <a className="dropdown-item" href="/owner/login">Owner Login</a>
                  </div>
                </div>
                )
                :
                (
                <div className="btn btn-group">
                  <button id="white" className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/Profile">Profile</a>
                    <a className="dropdown-item" href="/traveller/mytrips">My Trips</a>
                    <a className="dropdown-item" href="#" onClick= {this.logout}>Logout</a>
                  </div>
                </div>
                )
             }
              <button className="btn btn-group" style = {{color: "#fff", fontFamily: "Lato,Arial,Helvetica Neue,sans-serif", height: "40px", backgroundColor:"#fff", width: "200px", borderRadius: 25, borderColor: "#ffffff"}} data-effect="ripple" type="button" tabIndex="5" data-loading-animation="true">
              <a href="/owner/login">List your Property</a>
              </button>
              <img src={require('./homeaway_house_white.svg')} alt="Homeaway Logo"/>
          </div>
          </Navbar>
          <div className = "container">
            <div className="jumbotron jumbotron-fluid" style = {{background: "none"}}>
              <div className="container" style = {{marginTop :"10%"}}>
                  <h1 style ={{color: "white", fontFamily: "Lato,Arial,Helvetica Neue,sans-serif"}}>Book beach houses, cabins,</h1>
                  <h1 style ={{color: "white", fontFamily: "Lato,Arial,Helvetica Neue,sans-serif"}}>Condos and more, worldwide</h1>
                  <div className="row">
                    <div className="col-md-4 col-md-offset-3">
                      <div className="form-group">
                      	<input type="text" style ={{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}} className="form-control" name="search" id="search" placeholder="Where do you want to go?" onChange = {this.searchLocationChangeHandler}/>
                        <span className="glyphicon glyphicon-search form-control-feedback"></span>
                      </div>
                    </div>
                  <div className="col-md-offset-3">
                    <input style ={{width: "130px", height: "60px"}} onChange = {this.fromDateChangeHandler} type="date" name="fromdate"/>  
                  </div>
                  <div className="col-md-offset-3" style = {{marginLeft: "13px"}}>
                    <input style ={{width: "130px", height: "60px"}} onChange = {this.toDateChangeHandler} type="date" name="todate"/>  
                  </div>
                  <div className="col-md-offset-3" style = {{marginLeft: "13px"}}>
                    <div className="form-group">
                      <input type="number" min = "1" style ={{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}} className="form-control" placeholder="No of guests?" onChange = {this.guestsChangeHandler}/>
                      <span className="glyphicon glyphicon-search form-control-feedback"></span>
                    </div>
                  </div>
                  <div className="col-md-offset-3" style = {{marginLeft: "13px"}}>
                    <div className="form-group">
                      <a href="/property/searchresult">
                      <button className="btn btn-primary" onClick = {this.searchProperty} style = {{ height: "60px", borderColor: "#ffffff", backgroundColor:"#0067db", width: "120px", borderRadius: 25}} data-effect="ripple" type="button" tabIndex="5" data-loading-animation="true">
                        Search
                      </button>
                      </a>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
//export Home Component
export default Home;
