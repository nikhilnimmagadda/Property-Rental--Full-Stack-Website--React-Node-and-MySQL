import React, {Component} from 'react';
import 'typeface-roboto'
import './OwnerPropertyListings.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from "react-bootstrap";;

class OwnerPropertyListings extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: "",
            isLoading : true,
            allListings:[{}],
            detailsFetched:false,
        };
        
        this.renderListings = this.renderListings.bind(this);
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
        listedBy : cookie.load('cookie2'),
    }
        console.log("Calling Property Listings in Will Mount");
        console.log(data);
        axios.post('http://localhost:3001/homeaway/owner/propertylistings', data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                console.log(response.data)
                this.setState({
                    allListings : response.data,
                    isLoading : false
                });
            }
        });
    }

    renderListings () {
        const {allListings} = this.state;
        const {isLoading} = this.state;
        if(!isLoading){
            console.log("generating content...")
            return Object.keys(allListings).map((i) => {
                    return <div className="brdr bgc-fff pad-10 box-shad btm-mrg-20 myborder1 property-listing" key={allListings[i].ID}>
                    <div className="media">
                        <a className="pull-left" href="#" target="_parent">
                        <img alt="Thumbnail View of Property" className="img-responsive" src={`http://localhost:3001/uploads/${allListings[0].image1}`} /></a>
                        <div className="media-body">  
                            <h4 className="myh4">{allListings[i].headline}</h4>
                            <h6 className="myh6">{allListings[i].description}</h6>
  
                            <ul className="list-inline">
                                <li className = "list-inline-item"><img alt="Pindrop Sign" style={{height: "35px"}} src={require('./pindrop.png')}/></li>
                                <li className = "list-inline-item">{allListings[i].streetAddress}</li>
                                <li className = "list-inline-item">{allListings[i].city}</li>
                                <li className = "list-inline-item">{allListings[i].state}</li>
                                <li className = "list-inline-item">{allListings[i].country}</li>
                            </ul>
    
                            <ul className="list-inline">
                                <li className = "list-inline-item">{allListings[i].propertyType}</li>
                                <li className = "list-inline-item dot"> </li>
                                <li className = "list-inline-item"> {allListings[i].bedrooms} BR</li>
                                <li className = "list-inline-item dot"> </li>
                                <li className = "list-inline-item"> {allListings[i].bathrooms} BA</li>
                                <li className = "list-inline-item dot"></li>
                                <li className = "list-inline-item"> Sleeps {allListings[i].sleeps}</li>
                                <li className = "list-inline-item dot"></li>
                                <li className = "list-inline-item"> Min Stay {allListings[i].minStay}</li>
                            </ul>
    
                            <span className ="price">
                                <strong style ={{fontSize: "20px"}}><span className = "Price__value">${allListings[i].currency + ' ' + allListings[i].baseRate + ' /night'}</span></strong>
                            </span>

                            <br></br><br></br><br></br>
                            {allListings[i].bookedBy.length > 0
                                ?
                                (   
                                    <div>
                                        <table class="table table-striped" id="bookings">
                                            <thead>
                                                <tr>
                                                <   th>Booking ID</th>
                                                    <th>Booked By</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>No. Of Guests</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            { this.renderbookingTable(allListings[i]) }
                                        </table>
                                    </div>
                                )
                                :
                                (
                                    <div className = "container-full">
                                        <h2> No Booking History! </h2>
                                    </div>
                                )
                            }
                        </div>      
                    </div>
                </div>
            });
        }
    }

    renderbookingTable (listingData) {
        const {isLoading} = this.state;
        if(!isLoading){
            console.log("generating table content...")
            return Object.keys(listingData.bookedBy).map( (j) => {
                return <tbody data-ng-repeat="bookingData in listingData[i]">
                        <td>{listingData.bookingID[j]}</td>
                        <td>{listingData.bookedBy[j]}</td>
                        <td>{listingData.bookedFrom[j]}</td>
                        <td>{listingData.bookedTo[j]}</td>
                        <td>{listingData.noOfGuests[j]}</td>
                        <td>$ {listingData.price[j]}</td>
                </tbody>
            });
        }
    }

    render(){
        
        let redirectVar = null;
        console.log(cookie.load('cookie1'))
        if(cookie.load('cookie1') !== 'ownercookie'){
          redirectVar = <Redirect to = "/owner/login"/>
        }

        if (this.state.allListings.length === 0) {
            this.state.detailsFetched = false 
        }
        else {
            this.state.detailsFetched = true 
        }

        return(
            <div>
            {redirectVar}
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="#" title = "HomeAway" className = "logo"><img alt="Homeaway Logo" src={require('./homeaway_logo.png')}/></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <div>
                <div className="btn btn-group">
                    <button className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="/Profile">Profile</a>
                        <a className="dropdown-item" href="/owner/propertypost">Post Property</a>
                        <a className="dropdown-item" onClick = {this.logout}>Logout</a>
                    </div>
                </div>
                <img src={require('./logo.png')} alt="Homeaway Logo"/>
                </div>
            </Navbar>
                {this.state.detailsFetched 
                ?
                (            
                    <div className = "container-full">
                        <div className="container-pad">
                            <div className="form-row myformrow">
                                <div className="form-group col-sm-9" id = "property-listings" style ={{maxWidth : "900px"}}>
                                    { this.renderListings() }
                                </div>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className = "container-full">
                        <div className="container-pad">
                            <h1> You have not listed any Property! </h1>
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}
export default OwnerPropertyListings;
