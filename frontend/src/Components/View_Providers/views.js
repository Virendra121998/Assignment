import React, { Component } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './view.css';

 class View extends Component{
    state={
        id:[],
        startDate:new Date()
    }
    /*componentDidMount(){
        axios.get("http://localhost:5000/zone",{params:{name:this.props.location.search.zone}})
        .then((response)=>{
            let ids=[];
            response.data.result.forEach((index)=>{
                ids.push(index._id);
            })
            this.setState({id:ids})
        })
        .catch((error)=>{
            console.log(error);
        })
    }*/
    handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    submitHandler=()=>{
        let day=this.state.startDate.getDate();
        let month=this.state.startDate.getMonth();
        let year=this.state.startDate.getFullYear();
        this.props.history.push('/timeline?date='+day+'&month='+month+'&year='+year);
    } 

    render() {
        return (
          <div className="date">  
           <label>Select Date</label>    
          <DatePicker
            className="date-picker"
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <button onClick={this.submitHandler}>Submit</button>
          </div>
        );
      }
}

export default View;