import React,{Component} from 'react';
import './App.css';
import{BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Dropdown from './Components/Dropdown';
import MapContainer from './Components/Maps/map';
import Head from './Components/header/header';
import View from './Components/View_Providers/views';
import timeline from './Components/View_Providers/Timeline/timeline';

class App extends Component {
  
  render(){ 
    return (
      <Router>
        <Head/>
        <Switch>
        <Route path="/maps" component={MapContainer}/>
        <Route path="/viewProviders"  component={View}/>
        <Route path="/timeline"  component={timeline}/>
        <Route path="/"  component={Dropdown}/>
                
        </Switch>
      </Router>
   );
    }
  }

export default App;
