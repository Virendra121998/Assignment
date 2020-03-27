import React,{Component} from 'react';
import {Chart} from 'react-google-charts';
import axios from 'axios';
import queryString from 'query-string';

class timeline extends Component{
 state={
     data:[],
     noResult:false,
     error:false
}
    componentDidMount()
 {
     
     let values=queryString.parse(this.props.location.search);
     let d=new Date(values.year,values.month,values.date,0,0,0,0);
     console.log(d,typeof(d))
     axios.get('http://localhost:5000/calender',{params:{
         year:values.year,
         month:values.month,
         date:values.date
     }}).then((response)=>{
         if(response.data.result.length){
                let res=[[
            { type: 'string', id: 'Room' },
            { type: 'string', id: 'Name' },
            { type: 'date', id: 'Start' },
            { type: 'date', id: 'End' }
          ]];
         response.data.result.forEach((index)=>{
          let temp=[];
          temp.push(index.provider_id)
          temp.push(index.event_type)
          //console.log(typeof(new Date(index.start_time)));
          temp.push(new Date(index.start_time))
          temp.push(new Date(index.end_time))
          res.push(temp);
         })
         console.log(res);
         this.setState({
             data:res,
        })
       }
       else
        this.setState({noResult:true})
     }).catch((error)=>{
         this.setState({error:true})
         })
}
 
render(){   
  if(this.state.error)
   return <h1>Something Went Wrong</h1>
  if(this.state.noResult)
   return <h1>No Providers Found</h1> 
  return(
    <div>
    <Chart
  width={'100%'}
  height={'300px'}
  chartType="Timeline"
  loader={<div>Loading Chart</div>}
  data={this.state.data}
  options={{
    timeline: { showRowLabels: true,groupByRowLabel:true },
    avoidOverlappingGridLines: true,
    
  }}
  rootProps={{ 'data-testid': '8' }}
/>
</div>
 )};
}

export default timeline;