import React from 'react';

const List=(props)=>{
  
  return(
      <option value={props.city}>
        {props.city}
      </option>
  )    
};

export default List;
