import React from 'react';

const TextInput = ({value, textInputChange}) => {
  return(  
    <input 
      className={"input-reset ba b--black-20 pa2 db "} 
      // style={{ postiton:"fixed", bottom: "0"}} 
      value={value} 
      onChange={textInputChange}  
    />
  );
};

export default TextInput;