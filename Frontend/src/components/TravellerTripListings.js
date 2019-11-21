import React, {Component} from 'react';
import 'typeface-roboto'
import './OwnerPropertyListings.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from "react-bootstrap";;

class TravellerTripListings extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: "",
            isLoading : true,
            allTrips:[{}],
        };
        
        this.renderTrips = this.renderTrips.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout = () => {
        cookie.remove('cookie1', {path: '/'})
        cookie.remove('cookie2', {path: '/'})
        cookie.remove('cookie3', {path: '/'})
        console.log("All cookies removed!")
        window.location = "/"
    }
    
  componentWillMount(){
    
    const data = { 
        bookedBy : cookie.load('cookie2'),
    }
        console.log("Calling Property Listings in Will Mount");
        console.log(data);
        axios.post('http://localhost:3001/homeaway/traveller/triplistings', data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                console.log(response.data)
                this.setState({
                    allTrips : response.data,
                    isLoading : false
                });
            }
        });
    }

    renderTrips () {
        const {allTrips} = this.state;
        const {isLoading} = this.state;
        if(!isLoading){
            console.log("generating content...")
            return Object.keys(allTrips).map((i) => {
                    return <div className="brdr bgc-fff pad-10 box-shad btm-mrg-20 myborder1 property-listing" key={allTrips[i].ID}>
                    <div className="media">
                        <a className="pull-left" href="#" target="_parent">
                        <img alt="Thumbnail View of Property" className="img-responsive" src={`http://localhost:3001/uploads/${allTrips[0].image1}`} /></a>
                        <div className="media-body">  
                            <h4 className="myh4">{allTrips[i].headline}</h4>
                            <h6 className="myh6">{allTrips[i].description}</h6>
  
                            <ul className="list-inline">
                                <li className = "list-inline-item"><img alt="Pindrop Sign" style={{height: "35px"}} src={require('./pindrop.png')}/></li>
                                <li className = "list-inline-item">{allTrips[i].streetAddress}</li>
                                <li className = "list-inline-item">{allTrips[i].city}</li>
                                <li className = "list-inline-item">{allTrips[i].state}</li>
                                <li className = "list-inline-item">{allTrips[i].country}</li>
                            </ul>
    
                            <ul className="list-inline">
                                <li className = "list-inline-item">{allTrips[i].propertyType}</li>
                                <li className = "list-inline-item dot"> </li>
                                <li className = "list-inline-item"> {allTrips[i].bedrooms} BR</li>
                                <li className = "list-inline-item dot"> </li>
                                <li className = "list-inline-item"> {allTrips[i].bathrooms} BA</li>
                                <li className = "list-inline-item dot"></li>
                                <li className = "list-inline-item"> Sleeps {allTrips[i].sleeps}</li>
                                <li className = "list-inline-item dot"></li>
                                <li className = "list-inline-item"> Min Stay {allTrips[i].minStay}</li>
                            </ul>
    
                            <span className ="price">
                                <strong style ={{fontSize: "20px"}}><span className = "Price__value">${allTrips[i].currency + ' ' + allTrips[i].baseRate + ' /night'}</span></strong>
                            </span>

                        </div>      
                    </div>
                </div>
            });
        }
    }

    render(){
        
        let redirectVar = null;
        console.log(cookie.load('cookie1') === 'travellercookie')
        if(!cookie.load('cookie1')){
          redirectVar = <Redirect to = "/"/>
      }

  return(
    <div>
      {redirectVar}
      <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
            <a href="/" title = "HomeAway" className = "logo"><img alt="Homeaway Logo" src={require('./homeaway_logo.png')}/></a>
            </Navbar.Brand>
          </Navbar.Header>
        <div>
           <div className="btn btn-group">
             <button className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
             <div className="dropdown-menu">
                <a className="dropdown-item" href="/Profile">Profile</a>
                <a className="dropdown-item" href="/">Book My Trip</a>
                <a className="dropdown-item" onClick = {this.logout}>Logout</a>
             </div>
           </div>
           <img src={require('./logo.png')} alt="Homeaway Logo"/>
        </div>
      </Navbar>
            <div className = "container-full">
                <div className="container-pad">
                    <div className="form-row myformrow">
                        <div className="form-group col-sm-9" id = "property-listings" style ={{maxWidth : "900px"}}>
                            { this.renderTrips() }
                        </div>
                    </div>
                </div>
          </div>
        </div>
        )
    }
}
export default TravellerTripListings;
