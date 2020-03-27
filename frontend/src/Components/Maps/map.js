import React, { Component } from 'react';
import {Map, GoogleApiWrapper,Polygon} from 'google-maps-react';
import axios from 'axios';
import queryString from 'query-string';
 
class MapContainer extends Component {
  state={
    triangleCoords:[{lat:0,lng:0}],
    isError:false,
    noResult:false,
  }
  componentDidMount()
  { 
    let values=queryString.parse(this.props.location.search);
    console.log(values.city,values.category)
    axios.get('http://localhost:5000/onezone',{params:{
      city:values.city,
      category:values.category
    }}).then((response)=>{
       if(response.data.result.length){
       let points=[]  
       response.data.result.forEach(element => {
         points.push({
           lat:parseFloat(element.boundary[0].lat),
           lng:parseFloat(element.boundary[0].lng)
         })
        })
        console.log(points)
       this.setState({triangleCoords:points})
      } 
      else
       this.setState({noResult:true}) 
    }).catch((error)=>{
       this.setState({isError:true})
    })
  }
  render() {
    if(this.state.isError)
    {
      return(<h1>Something Went Wrong</h1>)
    }
    if(this.state.noResult){
      return(<h1>No Such Zone Found</h1>)
    }
    return (
     <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        center={{lat:this.state.triangleCoords[0].lat,lng:this.state.triangleCoords[0].lng}}
        zoom={11}>
         <Polygon
          paths={this.state.triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />
    </Map>
      
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAlshfSjQ2dC2csgJyz4KCx6Pg90l-otWI'
})(MapContainer)

//'AIzaSyAlshfSjQ2dC2csgJyz4KCx6Pg90l-otWI'