import React, {Component} from 'react';
import './PropertyDetails.css';
import 'typeface-roboto'
import axios from 'axios';
import cookie from 'react-cookies';
import moment from 'moment';
import {Navbar} from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Helmet from 'react-helmet';
import Tabs from 'react-web-tabs/lib/Tabs';
import Tab from 'react-web-tabs/lib/Tab';
import TabPanel from 'react-web-tabs/lib/TabPanel';
import TabList from 'react-web-tabs/lib/TabList';
import SweetAlert from 'react-bootstrap-sweetalert';

class PropertyDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
          isTravelerLoggedIn: false,
          propertyid: this.props.match.params.id,
          location : this.props.match.params.location,
          fromdate : this.props.match.params.fromdate,
          todate : this.props.match.params.todate,
          noOfGuests:this.props.match.params.noOfGuests,
          guests :"",
          nightlyrate : "",
          bookingFromDate :"",
          bookingToDate :"",
          isLoading : true,
          requestedDays : 0,
          price : 0,
          propertyDetails: [{}],
          adate : false,
          ddate : false,
          pguests : false,
          alert: null,
          booked : false
        };
        this.logout = this.logout.bind(this);
        this.fromDateChangeHandler = this.fromDateChangeHandler.bind(this);
        this.toDateChangeHandler = this.toDateChangeHandler.bind(this);
        this.noOfGuestsChangeHandler = this.noOfGuestsChangeHandler.bind(this);
        this.submitBooking = this.submitBooking.bind(this);
    }
    
    componentWillMount () {
        console.log("In Property Details");
        var propertyID = this.state.propertyid;

        var url = "http://localhost:3001/homeaway/property/" + propertyID;
        axios.get(url)
        .then(response => {
            console.log("Status Code : ", response.status);
            if(response.status === 200){
                console.log(response.data)
                this.setState({propertyDetails : response.data})
            }
            console.log(this.state.propertyDetails.headline);
        });
    }
    
    fromDateChangeHandler = (e) => { 
        e.preventDefault();
        this.setState({bookingFromDate : e.target.value,
            adate: true
        })
    }

    toDateChangeHandler = (e) => {
        e.preventDefault();
        this.setState({bookingToDate : e.target.value,
             ddate: true
        })
    }

    noOfGuestsChangeHandler = (e) => {
        this.setState ({
            guests : e.target.value,
            pguests : true
        })
    }

    handleValidation(){
        let formIsValid = true;
    
        //From Date
        if(this.state.bookingFromDate < this.state.fromdate || this.state.bookingFromDate > this.state.todate){
            alert('Arrive date should be between the searched dates');
            formIsValid = false;
        }
    
        //To Date
        if(this.state.bookingToDate < this.state.fromdate || this.state.bookingToDate > this.state.todate){
            alert('Depart date should be between the searched dates');
            formIsValid = false;
        }

        if(this.state.bookingFromDate >= this.state.bookingToDate){
            alert('Arrival date should be before departure date');
            formIsValid = false;
        }
    
         //Numberof guests
        if(this.state.guests > this.state.noOfGuests){
            alert("Number of guests should be less than or same as the searched criteria");
            formIsValid = false;
        }
       return formIsValid;
    }

    logout = () => {
        cookie.remove('cookie1', {path: '/'})
        cookie.remove('cookie2', {path: '/'})
        cookie.remove('cookie3', {path: '/'})
        console.log("All cookies removed!")
        window.location = "/"
    }

    shouldComponentUpdate(nextState) {
        if (nextState.bookingFromDate !== this.state.bookingFromDate) {
            return true; }
        if (nextState.bookingToDate !== this.state.bookingToDate) {
            return true; }
        else {
            return false }
    }

    shouldComponentUpdate(prevState){
        if (prevState.bookingFromDate !== this.state.bookingFromDate){
            return true;
        }
        if (prevState.bookingToDate !== this.state.bookingToDate){
            return true;
        } else {
            return false
        }
    }

    submitBooking = () => {
        if(this.handleValidation()){
            const getAlert = () => (
                <SweetAlert 
                success 
                title = "Congratulations!!"
                onConfirm={() => this.addBooking()}> 
                You successfully booked this property!!!
                </SweetAlert>
            );
     
            if (this.state.adate && this.state.ddate && this.state.pguests && this.state.isTravelerLoggedIn) {
                this.setState({
                    alert: getAlert(),
                    //booked: true
                })
            } else {
                if (!this.state.isTravelerLoggedIn){
                    window.alert("You must be logged in to book this property!!!")}
                else{
                    window.alert("Please enter all the fields")
                }
            }
        }
    }

    addBooking(){
    
        var price = this.state.price
        price = price.toString();

        var data = {
            propertyid: this.state.propertyid,
            bookedBy: cookie.load('cookie2'),
            bookedFrom : this.state.bookingFromDate,
            bookedTo : this.state.bookingToDate,
            NoOfGuests : this.state.guests,
            pricePaid : price
            }
            axios.post('http://localhost:3001/homeaway/bookproperty', data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("booked property")
                    window.close();
                }
            });
    }

    render(){

        if(cookie.load('cookie1') === 'travellercookie'){
          this.state.isTravelerLoggedIn = true
        } 
        const {propertyDetails} = this.state;

        var start = moment(this.state.bookingFromDate, "YYYY-MM-DD");
        var end = moment(this.state.bookingToDate, "YYYY-MM-DD");
        //Difference in number of days
        var difference = (moment.duration(end.diff(start)).asDays());
        var price = difference * propertyDetails[0].baseRate;

        this.state.price = price;

        return(
          <div>
            <Helmet>
              <style>{'body { background-color: white; }'}</style>
            </Helmet>
                <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/" title = "HomeAway" className = "logo"><img src={require('./homeaway_logo.png')} alt="Homeaway Logo"/></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <div>
                    <img alt="US Flag" src={require('./us_flag.png')}/>
                    <button id="blue" className="btn" style = {{fontColor : "black", backgroundColor:"white", background:"white", borderColor:"white"}} type="button"><a href="#">Trip Boards</a></button>
                    {!this.state.isTravelerLoggedIn 
                    ?
                    (
                        <div className="btn btn-group">
                            <button id="blue" className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><a href="#">Login</a></button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/traveller/login">Traveller Login</a>
                                <a className="dropdown-item" href="/owner/login">Owner Login</a>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="btn btn-group">
                            <button id="blue" className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
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
                    <img src={require('./logo.png')} alt="Homeaway Logo"/>
                </div>
            <div className="container" style = {{marginTop :"1%"}}>
              <div className="row">
                  <div className="col-md-4 col-md-offset-3">
                      <div className="form-group">
                      <input type="text" style ={{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}} className="form-control" name="search" id="search" placeholder="Where do you want to go?" defaultValue = {this.state.location} readOnly/>
                        <span className="glyphicon glyphicon-search form-control-feedback"></span>
                      </div>
                  </div>
                  <div className="col-md-offset-3">
                      <div className="form-group card" style = {{ height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                      <input
                            type = "date"
                            style ={{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}} className="form-control"
                            value={this.state.fromdate}
                            readOnly
                      />
                      </div>
                  </div>
                  <div className="col-md-offset-3" style = {{marginLeft: "13px"}}>
                      <div className="form-group card" style = {{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}> 
                      <input
                          style ={{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}} className="form-control"
                          type = "date"
                          readOnly
                          value={this.state.todate} />
                      </div>
                  </div>
                  <div className="col-md-offset-3" style = {{marginLeft: "13px"}}>
                      <div className="form-group">
                      <input type="text" style ={{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}} className="form-control" value= {this.state.noOfGuests} readOnly/>
                        <span className="glyphicon glyphicon-search form-control-feedback"></span>
                      </div> 
                  </div>
                  </div>
            </div>
            </Navbar>
            <div className = "container-full">
                <div className="container-pad">
                    <div className="form-row ">
                        <div className="form-group col-sm-8 FixedHeightContainer border" id = "property-listings" style ={{maxWidth : "1000px"}}>
                            <div style = {{background: "#D6EBF2"}}  className ="Content">
                            <Carousel autoPlay showThumbs={false}>
                            
                                <div>
                                    <img alt="Image 1" className="img-responsive" src={`http://localhost:3001/uploads/${propertyDetails[0].image1}`} />
                                </div>
                            
                             <div>
                                    <img alt="Image 2" className="img-responsive" src={`http://localhost:3001/uploads/${propertyDetails[0].image2}`} />
                                </div>
                                <div>
                                    <img alt="Image 3" className="img-responsive" src={`http://localhost:3001/uploads/${propertyDetails[0].image3}`} />
                                </div>
                                <div>
                                    <img alt="Image 4" className="img-responsive" src={`http://localhost:3001/uploads/${propertyDetails[0].image4}`} />
                                </div>
                            <div>
                                    <img alt="Image 5" className="img-responsive" src={`http://localhost:3001/uploads/${propertyDetails[0].image5}`} />
                                </div>
                            
                            </Carousel>

                            <div>
                            <Tabs defaultTab="one"
                            onChange={(tabID) => { console.log(tabID)}}>
                                <TabList>
                                <div className="topnav">
                                    <div className = "row">
                                    <div className = "col-md-2">
                                        <Tab tabFor="one" style = {{marginTop : "20px", borderRight :"none", borderLeft :"none", padding : "0 0 0 0"}}><a>Overview</a></Tab>
                                    </div>
                                    <div className = "col-md-2">
                                        <Tab tabFor="two" style = {{marginTop : "20px", borderRight :"none", borderLeft :"none", padding : "0 0 0 0"}}><a>Amenities</a></Tab>
                                    </div>
                                    </div>
                                </div>
                                </TabList>
                                <TabPanel tabId="one">
                                    <div className = "container" style = {{marginTop : "20px"}}>
                                        <h4 className="media-heading"><img style={{height: "35px"}} alt="Small Map" src={require('./maps-icon.png')}/>{propertyDetails[0].headline}</h4>
                                        <div className = "row" style = {{marginTop :"20px"}}>
                                        <h2><img alt="Pindrop Sign" style={{height: "35px"}} src={require('./pindrop.png')}/>{propertyDetails[0].city}, {propertyDetails[0].state}, {propertyDetails[0].country}</h2>
                                        </div>
                                        <div className = "row" style = {{marginTop :"20px"}}>
                                        <ul className="list-inline">
                                            <li className = "list-inline-item">{propertyDetails[0].propertyType}</li>
                                            <li className = "list-inline-item dot"></li>
                                            <li className = "list-inline-item"> {propertyDetails[0].bedrooms} BR</li>
                                            <li className = "list-inline-item dot"></li>
                                            <li className = "list-inline-item"> {propertyDetails[0].bathrooms} BA</li>
                                            <li className = "list-inline-item dot"></li>
                                            <li className = "list-inline-item"> Sleeps  {propertyDetails[0].sleeps}</li>
                                        </ul>
                                        </div>
                                        <div className = "row" style = {{marginTop :"10px"}}>
                                        <p className = "para-font">{propertyDetails[0].description}</p>
                                        </div> 
                                    </div>
                                </TabPanel>
                                <TabPanel tabId = "two">
                                <div className = "container" style = {{marginTop : "20px"}}>
                                        <hr/> 
                                        <div className = "row" style = {{marginTop :"20px"}}>
                                        <p className = "para-font">{propertyDetails[0].amenities}</p>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                            </div>
                            </div>
                        </div>
                        <div className = "form-group col-md-3 border" style = {{height: "510px"}} >
                            <div className = "card-body " style = {{background: "#b4ecb4", width : "385px"}}>
                                <div className="row">
                                    <div className="col-xs-1"><h4 className="media-heading">$ {propertyDetails[0].baseRate}</h4></div>
                                    <div className="col-sm-2" style = {{marginTop : "6px"}}><h6 className="media-heading">avg/night</h6>
                                </div>
                            </div>
                            <div className = "container" style = {{marginTop : "30px"}}>
                                <div className="row">
                                    <div className="col-md-offset-3">
                                        <div className="form-group" style = {{fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                                            <h5>Arrive</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-offset-6">
                                        <div className="form-group card" style = {{fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                                        <input onChange={this.fromDateChangeHandler} style = {{height: "40px", width: "150px"}} value={this.state.bookingFromDate} type="date" name="fromdate"/>
                                        </div>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="col-md-offset-3">
                                        <div className="form-group " style = {{fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                                            <h5>Depart</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="col-md-offset-6">
                                        <div className="form-group card" style = {{ fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                                     <input onChange={this.toDateChangeHandler} style = {{height: "40px", width : "150px"}} value={this.state.bookingToDate} type="date" name="todate"/>
                                        </div>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="col-md-offset-3">
                                        <div className="form-group " style = {{fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                                            <h5>No of Guests</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="col-md-8">
                                        <div className="form-group card" style = {{height: "40px", marginLeft : "-9px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                                            <input type="text" style ={{height: "60px", fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}} className="form-control"
                                            value={this.state.guests} onChange = {this.noOfGuestsChangeHandler} min="1"/>
                                            <span className="glyphicon glyphicon-search form-control-feedback"></span>
                                         </div>
                                    </div>
                                </div>
                                    {(this.state.adate  && this.state.ddate && this.state.pguests ?
                                            <div className = "row">
                                                <div className="col-md-offset-3">
                                                    <div className="form-group " style = {{fontFamily: "Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif"}}>
                                                        <h5>Price for {difference} nights is ${this.state.price}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                    :
                                    null
                                    )}
                                    <div className="form-group" style ={{marginLeft : "50px", marginTop : "40px"}}>
                                        <button className="btn btn-primary" onClick = {this.submitBooking} style = {{ height: "60px", borderColor: "#ffffff", backgroundColor:"#0067db", width: "200px", borderRadius: 25}} data-effect="ripple" type="button" tabIndex="5" data-loading-animation="true">
                                            Book Now
                                        </button>
                                        {this.state.alert}
                                    </div>
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
  
export default PropertyDetails;
