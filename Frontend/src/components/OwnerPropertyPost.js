import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './OwnerPropertyPost.css';
import {Navbar} from "react-bootstrap";
import ReactDropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
const imageMaxSize = 1000000000 // bytes

//Define a OwnerPropertyPost Component
class OwnerPropertyPost extends Component{
  //call the constructor method
  constructor(props){
    super(props);
      this.state =  {
      name: cookie.load('cookie3'),
      startDate: new Date(),
      endDate: new Date(),
      sleeps : 1,
      headline: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      zipcode: 0,
      description: "",
      propertyType: "Family Home",
      amenities : "",
      bedrooms: 0,
      bathrooms: 0,
      minStay : 0,
      currency: "USD",
      baseRate : 0,
      uploadedPhotos: [],
      uploadedPhotoLimit: 5,
      previewuploadedPhotos: [],
      inputPhotos:[],
      alert: null,
      posted: false,
      };
      this.logout = this.logout.bind(this);
      this.streetAddressChangeHandler = this.streetAddressChangeHandler.bind(this);
      this.cityChangeHandler = this.cityChangeHandler.bind(this);
      this.stateChangeHandler = this.stateChangeHandler.bind(this);
      this.countryChangeHandler = this.countryChangeHandler.bind(this);
      this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
      this.amenitiesChangeHandler = this.amenitiesChangeHandler.bind(this);
      this.minStayChangeHandler = this.minStayChangeHandler.bind(this);
      this.baseRateChangeHandler = this.baseRateChangeHandler.bind(this);
      this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
      this.propertyTypeChangeHandler = this.propertyTypeChangeHandler.bind(this);
      this.bedroomsChangeHandler = this.bedroomsChangeHandler.bind(this);
      this.sleepsChangeHandler = this.sleepsChangeHandler.bind(this);
      this.bathroomsChangeHandler = this.bathroomsChangeHandler.bind(this);
      this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
      this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
      this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
      this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.addProperty = this.addProperty.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
      this.submitListing = this.submitListing.bind(this);
}
streetAddressChangeHandler =  (e) =>{this.setState ({streetAddress : e.target.value})}

cityChangeHandler =  (e) =>{this.setState ({city : e.target.value})}

stateChangeHandler =  (e) =>{this.setState ({state : e.target.value})}

countryChangeHandler =  (e) =>{this.setState ({country : e.target.value})}

zipcodeChangeHandler =  (e) =>{this.setState ({zipcode : e.target.value})}

headlineChangeHandler =  (e) =>{this.setState ({headline : e.target.value})}

descriptionChangeHandler =  (e) =>{this.setState ({description : e.target.value})}

amenitiesChangeHandler =  (e) =>{this.setState ({amenities : e.target.value})}

minStayChangeHandler =  (e) =>{this.setState ({minStay : e.target.value})}

baseRateChangeHandler =  (e) =>{this.setState ({baseRate : e.target.value})}

propertyTypeChangeHandler =  (e) =>{this.setState ({propertyType : e.target.value})}

bedroomsChangeHandler =  (e) =>{this.setState ({bedrooms : e.target.value})}

bathroomsChangeHandler = (e) => {this.setState ({bathrooms : e.target.value})}

sleepsChangeHandler =  (e) =>{this.setState ({sleeps : e.target.value})}

currencyChangeHandler =  (e) =>{this.setState ({currency : e.target.value})}

startDateChangeHandler = (e) => this.setState ({ startDate:  e.target.value })

endDateChangeHandler = (e) => this.setState ({ endDate:  e.target.value })

logout = () => {
  cookie.remove('cookie1', {path: '/'})
  cookie.remove('cookie2', {path: '/'})
  cookie.remove('cookie3', {path: '/'})
  console.log("All cookies removed!")
  window.location = "/"
}

handleValidation(){
  let formIsValid = true;

  //From Date
  if(!this.state.startDate){
    formIsValid = false;
    alert("From Date is a Required field");
    console.log("From Date cannot be empty");
  } else {
    var CurrentDate = new Date();
    CurrentDate.setHours(0,0,0,0);
    var GivenstartDate = new Date(this.state.startDate.replace(/-/g, '\/'));
    if(GivenstartDate < CurrentDate){
      alert('From date should be greater than the current date.');
      formIsValid = false;
    }
  }

  //End Date
  if(!this.state.endDate){
      formIsValid = false;
      alert("To Date is a Required field");
      console.log("To Date cannot be empty");
   } else {
    var CurrentDate = new Date();
    CurrentDate.setHours(0,0,0,0);
    var GivenendDate = new Date(this.state.endDate.replace(/-/g, '\/'));

    if(GivenendDate < CurrentDate){
      alert('To date should be greater than the current date.');
      formIsValid = false;
    } else {
      if (GivenendDate <= GivenstartDate){
        alert('To date should be greater than from date.');
        formIsValid = false;
      }
    }
  }

   //Numberof guests
   if(!this.state.sleeps){
    formIsValid = false;
    alert("Number of Guests is a Required field");
    console.log("Number of guests cannot be empty");
  }
  
 return formIsValid;
}

submitListing = () => {
  console.log("In submit")
  if(this.handleValidation()){
    console.log("in setting alert");
      const getAlert = () => (
          <SweetAlert 
          success 
          title = "Congratulations!!"
          onConfirm={() => this.addProperty()}> 
          You successfully listed your property!!!
          </SweetAlert>
      );

      this.setState({
        alert: getAlert(),
      })
    }
}

addProperty = (e) => {
  console.log("In Add Property");
  console.log(this.state.startDate);
  var data = {
    listedBy: cookie.load('cookie2'),
    startDate: this.state.startDate,
    endDate: this.state.endDate,
    streetAddress: this.state.streetAddress,
    city: this.state.city,
    state: this.state.state,
    country: this.state.country,
    zipcode: this.state.zipcode,
    headline: this.state.headline,
    description: this.state.description,
    propertyType: this.state.propertyType,
    bedrooms: this.state.bedrooms,
    sleeps: this.state.sleeps,
    bathrooms: this.state.bathrooms,
    baseRate: this.state.baseRate,
    currency: this.state.currency,
    minStay: this.state.minStay,
    amenities: this.state.amenities,
  }

  var formdata= new FormData();

  for (var i=0; i< this.state.uploadedPhotos.length; i++){
    formdata.append('uploadedPhoto', this.state.uploadedPhotos[i]);
    console.log(this.state.uploadedPhotos[i]);
  }

  Object.keys(data).forEach(function(key){
    formdata.append(key, data[key]);

  });

  // Display the key/value pairs
  for (var pair of formdata.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }

  axios.defaults.withCredentials = true;
  axios.post('http://localhost:3001/homeaway/owner/listproperty', formdata)
    .then(response => {
      if(response.data) {
        console.log("Successful post property");
        this.setState ({posted: true})
      }
    })
    .catch(error => {
      console.log("Post Property Server error")
  })
}

verifyFile = (files) => {
  if (files){
      const currentFile = files;
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if(currentFileSize > imageMaxSize) {
          alert("This file is not allowed. " + currentFileSize + " bytes is too large")
          return false
      }
      if (!acceptedFileTypesArray.includes(currentFileType)){
          alert("This file is not allowed. Only images are allowed.")
          return false
      }
      return true
  }
}

onDrop = (selectedFiles, rejectedFiles) => {
  let index;
  for (index = 0; index < selectedFiles.length; ++index) {
    const selectedfile = selectedFiles[index];
    const rejectedfile = rejectedFiles[index];
    if (rejectedfile){
      this.verifyFile(rejectedfile)
    }

    if (selectedfile){
      const isVerified = this.verifyFile(selectedfile)
      if (isVerified){
        if (this.state.previewuploadedPhotos.length < this.state.uploadedPhotoLimit){
          this.setState(({ previewuploadedPhotos }) => ({
            previewuploadedPhotos: previewuploadedPhotos.concat(selectedfile)
          }))

          console.log(this.state.selectedfile);

          this.setState({
           uploadedPhotos: this.state.uploadedPhotos.concat(selectedfile)
          })

          console.log(this.state.uploadedPhotos);

        } else {
          console.log(this.state.previewuploadedPhotos.length);
          alert ("You can upload a maximum of 5 images only!")
        }
      }
    }
  }
}

render(){

  let redirectVar = null;
  console.log(cookie.load('cookie1'))
  if(cookie.load('cookie1') != 'ownercookie'){
    redirectVar = <Redirect to = "/owner/login"/>
  }
  if(this.state.posted){
    redirectVar = <Redirect to = "/owner/mylistings"/>
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
             <button className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {this.state.name}</button>
             <div className="dropdown-menu">
                <a className="dropdown-item" href="/Profile">Profile</a>
                <a className="dropdown-item" href="/owner/mylistings">My Listings</a>
                <a className="dropdown-item" onClick = {this.logout}>Logout</a>
             </div>
           </div>
           <img src={require('./logo.png')} alt="Homeaway Logo"/>
        </div>
      </Navbar>
       <div className="container" style = {{fontFamily: "Lato,Arial,Helvetica Neue,sans-serif", marginTop : "50px"}}>
       <div className="row">
         <div className="col-md-12">
              <div id="accordion">
                       <div className="card">
                         <div className="card-header">
                           <a className="card-link"  data-toggle="collapse" href="#collapseOne">
                             Property Location
                           </a>
                         </div>
                         <div id="collapseOne" className="collapse show" data-parent="#accordion">
                           <div className="card-body">
                             <div className="row">
                               <div className="card-body">
                                 <h2>Verify the location of your rental</h2>
                                 <hr/>
                                 <div className="card-body border">
                                   <div className="form-row ">
                                     <div className="form-group col-md-9">
                                       <input id="streetAddress" name="streetAddress" onChange = {this.streetAddressChangeHandler} value = {this.state.streetAddress} placeholder="Street Address" className="form-control" required="required" type="text"/>
                                     </div>
                                     <div className="form-group col-md-3">
                                       <input name="city" onChange = {this.cityChangeHandler} value = {this.state.city} placeholder="City" className="form-control" required="required" type="text"/>
                                     </div>
                                     <div className="form-row ">
                                     <div className="form-group col-md-9">
                                     <select className="form-control" style={{width:"100%"}} onChange={this.stateChangeHandler}>
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
                                     <div className="form-group col-md-3">
                                       <input id="zipcode" name="zipcode" onChange = {this.zipcodeChangeHandler} value = {this.state.zipcode} placeholder="Zip Code" className="form-control" required="required" type="text"/>
                                     </div>
                                     <div className="form-group col-md-3">
                                       <input id="zipcode" name="country" onChange = {this.countryChangeHandler} value = {this.state.country} placeholder="Country" className="form-control" required="required" type="text"/>
                                     </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div className="card">
                         <div className="card-header">
                           <a className="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
                             Property Details
                           </a>
                         </div>
                         <div id="collapseTwo" className="collapse" data-parent="#accordion">
                           <div className="card-body">
                           <h2>Describe your property</h2>
                           <hr/>
                             <div className="container">
                               <div className="row">
                                 <div className="col-md-9 border card-body">
                                    <h6>Start out with a detailed summary of your property:</h6>
                                    <form className="form-horizontal">
                                    <div className="form-group col-xs-8">
                                    <input id="headline" name="headline" onChange = {this.headlineChangeHandler} value = {this.state.headline} placeholder="Headline" className="form-control" required="required" type="text"/>
                                    </div>
                                      <div className="form-group">
                                        <label htmlFor="textarea" className="control-label col-xs-4">Property Information:</label>
                                        <div className="col-xs-8">
                                          <textarea id="textarea" placeholder= "Property Description" onChange = {this.descriptionChangeHandler} value = {this.state.description} name="textarea" cols="40" rows="5" className="form-control"></textarea>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="textarea" className="control-label col-xs-4">Amenities:</label>
                                        <div className="col-xs-8">
                                          <textarea id="textarea" placeholder= "Amenities" onChange = {this.amenitiesChangeHandler} value = {this.state.amenities} name="textarea" cols="40" rows="3" className="form-control"></textarea>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="property" className="control-label col-xs-4">Property Type:</label>
                                        <div className="col-xs-8">
                                          <div className="input-group">
                                            <div className="input-group-addon">
                                              <i className="fa fa-inr"></i>
                                            </div>
                                            <select name="propertyType"  onChange = {this.propertyTypeChangeHandler} value={this.state.propertyType} className="select form-control">
                                              <option disabled hidden defaultValue>Property Type</option>
                                              <option value="Home">Family Home</option>
                                              <option value="Studio">Studio</option>
                                              <option value="Villa">Villa</option>
                                              <option value="Apartment">Apartment</option>
                                            </select>
                                           </div>
                                        </div>
                                      </div>
                                    </form>
                                 </div>
                                 <div className="col-md-3 border card-body">
                                   <form>
                                     <div className="form-row">
                                       <div className="form-group">
                                       <label htmlFor="bedroom" className="control-label col-xs-4">Bedrooms</label>
                                       <div className="col-xs-8">
                                         <div className="input-group">
                                           <div className="input-group-addon">
                                             <i className="fa fa-inr"></i>
                                           </div>
                                           <div className="select form-control">
                                           <input onChange = {this.bedroomsChangeHandler} value={this.state.bedrooms}  type="number" min = "0"/> </div>
                                         </div>
                                       </div>
                                       </div>
                                       <div className="form-group">
                                       <label htmlFor="accomodates" className="control-label col-xs-4">Accomodates</label>
                                       <div className="col-xs-8">
                                         <div className="input-group">
                                           <div className="input-group-addon">
                                             <i className="fa fa-inr"></i>
                                           </div>
                                           <div className="select form-control">
                                           <input onChange = {this.sleepsChangeHandler} value={this.state.sleeps} type="number" min = '1'/></div>
                                         </div>
                                       </div>
                                       </div>
                                     </div>
                                     <div className="form-row">
                                         <div className="form-group">
                                         <label htmlFor="bathrooms" className="control-label col-xs-4">Bathroom</label>
                                         <div className="col-xs-8">
                                           <div className="input-group">
                                             <div className="input-group-addon">
                                               <i className="fa fa-inr"></i>
                                             </div>
                                             <div className="select form-control">
                                             <input onChange = {this.bathroomsChangeHandler} value={this.state.bathrooms} type="number" min = "0"/> </div>
                                           </div>
                                         </div>
                                         </div>
                                      </div>
                                    </form>
                                   </div>
                               </div>
                             </div>
                           </div>
                         </div>
                         </div>
                       <div className="card">
                         <div className="card-header">
                           <a className="collapsed card-link" data-toggle="collapse" href="#collapseFour">
                             Photos
                           </a>
                         </div>
                         <div id="collapseFour" className="collapse" data-parent="#accordion">
                           <div className="card-body">
                           <h2>Add up to 5 photos of your property</h2>
                           <hr/>
                             <div className="container">
                               <div className="row">
                                  <div className="col-md-12 border card-body">
                                    <small>Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 2 photos minimum.</small>

                                      {this.state.previewuploadedPhotos.length > 0 ? <div>
                                        <h2>Preview of {this.state.previewuploadedPhotos.length} uploaded files</h2>
                                        <div>{this.state.previewuploadedPhotos.map((selectedfile) => <img className = "mypreview" src={selectedfile.preview} alt="Property Preview" />)}</div>
                                      </div> : null}
                                      <h2> Uploaded {this.state.uploadedPhotos.length} Files </h2>                                      
                                      <br></br>
                                      <ReactDropzone name="uploadedPhoto" onDrop={this.onDrop} accept={acceptedFileTypes} multiple={true} maxSize={imageMaxSize} >
                                          Drop your images here!!
                                      </ReactDropzone>
                                    <div>
                                  </div>
                                </div>
                              </div>
                             </div>
                           </div>
                         </div>
                       </div>

                       <div className="card">
                         <div className="card-header">
                           <a className="collapsed card-link" data-toggle="collapse" href="#collapseFive">
                             Pricing and Availability
                           </a>
                         </div>
                         <div id="collapseFive" className="collapse" data-parent="#accordion">
                           <div className="card-body">
                             <div className="row">
                                  <div className="col-md-3 border card-body">
                                     <form className="form-horizontal">
                                       <div className="form-group">
                                       <h2>Currency</h2>
                                       <hr/>
                                       <input type="baseRate" onChange = {this.baseRateChangeHandler} value = {this.state.baseRate} className="form-control" id="currency" placeholder="Enter value"/>
                                       </div>
                                       <div className="form-group">
                                       <h2>Nightly Base Rate</h2>
                                       <hr/>
                                       <select id="currency" name="currency"  onChange = {this.currencyChangeHandler} value={this.state.currency} className="select form-control">
                                              <option disabled hidden defaultValue>Currency</option>
                                              <option value="USD">US Dollar (USD)</option>
                                              <option value="AUD">Australian Dollar (AUD)</option>
                                              <option value="EUR">Euros (EUR)</option>
                                              <option value="GBP">Great British Pound (GBP)</option>
                                              <option value="CAD">Canadian Dollar (CAD)</option>
                                              <option value="NZD">New Zealand Dollar (NZD)</option>
                                              <option value="BRL">Brazil Real (BRL)</option>
                                            </select>
                                       </div>
                                       <div className="form-group">
                                       <h2>Minimum Stay</h2>
                                       <hr/>
                                       <input onChange = {this.minStayChangeHandler} value = {this.state.minStay} className="form-control" id="minStay" type="number" min = '1'/>Night
                                       </div>
                                     </form>
                                  </div>
                                  <div className="col-md-9 border card-body"  style = {{textAlign : "center"}}>
                                  <h6> Already know when you would like your property to be available?</h6>
                                  <form>
                                     <div className="form-row" style = {{marginTop :"20px"}}>
                                       <h2>Select dates for setting up your availability</h2>
                                       <hr/>
                                     </div>
                                     <div className="form-row">
                                     <label className="form-check-label" htmlFor="departdate" style = {{marginTop : "20px"}}>Property Available Date between</label>
                                      <input style ={{width: "130px"}} onChange = {this.startDateChangeHandler} type="date" name="fromdate"/>  
                                      <input style ={{width: "130px"}} onChange = {this.endDateChangeHandler} type="date" name="todate"/> 
                                     </div>
                                     <div className="form-row">
                                             <div className="form-group">
                                                 <div className="form-group">
                                                     <div className="form-check">
                                                       <label className="form-check-label" htmlFor="invalidCheck2">
                                                         <h6>By clicking Submit, you agree to our Terms & Conditions, Visitor Agreement and Privacy Policy.</h6>
                                                       </label>
                                                     </div>
                                                   </div>
                                               </div>
                                         </div>
                                         <div className="form-row">
                                             <button type="button" onClick = {this.submitListing} className="btn btn-danger">Submit</button>
                                             {this.state.alert}
                                         </div>
                                     </form>
                                  </div>
                                 </div>
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
//export Signup2 Component
export default OwnerPropertyPost;