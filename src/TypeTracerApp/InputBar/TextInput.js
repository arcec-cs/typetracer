import React from 'react';

const TextInput = ({value, textInputChange}) => {
  return(  
    <input 
      autoFocus
      className={"input-reset ba b--black-20 pa2 db w-34 "} 
      value={value} 
      onChange={textInputChange}  
    />
  );
};

export default TextInput;