import React,{ Component} from 'react';
import List from './City/List';
import './Dropdown.css';
import axios from 'axios';
import Categories from './Category/categories';
import Zone from './Zones/zone';
import { Link, Route} from 'react-router-dom';
import View from './View_Providers/views';

class  Dropdown extends Component{
state={
   city:'Dehradun',
   category:'c1',
   cities:[],
   categories:[],
   zones:[],
   isError:false,
   zoneName:'z1',
 }
componentDidMount(){
    let menu_city=[];
    let menu_category=[];
    let menu_zone=[];
  axios.get('http://localhost:5000/city_categories').then((response)=>{

    response.data.result.forEach(index => {
       menu_city.push(index.city);
       menu_category.push(index.category)
     })
     axios.get('http://localhost:5000/zone').then((res)=>{
     console.log(res); 
     res.data.result.forEach((index)=>{
        menu_zone.push(index.name)
      })
      this.setState({cities:menu_city,categories:menu_category,zones:menu_zone})
      }).catch((error2)=>{
        this.setState({isError:true})
     })
  }).catch((error1)=>{
     this.setState({isError:true})
  });

}
 
onSubmitHandler=()=>{
     
     this.props.history.push({
     pathname:'/maps',
     search:'?city='+this.state.city+'&category='+this.state.category
   });
}

  render(){
    
    const city_list=[...new Set(this.state.cities)];
    const category_list=[...new Set(this.state.categories)];
    const zones_list=[...new Set(this.state.zones)];
    console.log(city_list);
    const Lists=
      city_list.map((index)=>{ 
        return (
              <List city={index} />)
          });
      
    const Category=category_list.map((index)=>{
        return <Categories category={index}/>
      });
      
    const Zones=zones_list.map((index)=>{
        return <Zone zone={index} />
      });
    
    if(this.state.isError)
     return<h1>Something Went Wrong</h1>
    return(
    <div className="form-city">
       <div className ="form1">
         <div className="form1-select1"> 
           <label>City</label>
           <select  value ={this.state.city} onChange={(event)=> this.setState({city:event.target.value})} >
            {Lists}
           </select>
          </div>
          <div className="form1-select2">
           <label>Category</label>
           <select  value ={this.state.category} onChange={(event)=>this.setState({category:event.target.value})} >
            {Category}
           </select>
           </div> 
           <button onClick={this.onSubmitHandler}>Submit</button>
        </div>
        
        <div className="form2">
         <div className="form2-select">
          <label>Select</label>
          <select value={this.state.zoneName} onChange={(event)=>{this.setState({zoneName:event.target.value})}}>
            {Zones}
          </select>
          </div> 
          <Link to={{pathname:'/viewProviders',search:'?zone='+this.state.zoneName}} target="_blank"><button>View Providers</button></Link>
        </div>
        <Route path='/viewProviders' component={View}/>
     </div>
        
        
   );
  }
};

export default Dropdown;