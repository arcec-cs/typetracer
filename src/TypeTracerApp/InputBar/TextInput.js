import React from 'react';

const TextInput = ({value, textInputChange, styles, canType}) => {
  const maxLength = () => canType ? '1000' : '0';  
  return(  
    <input 
      autoFocus
      className={"input-reset ba b--black-20 pa2 db w-34 border-box"} 
      value={value} 
      onChange={textInputChange}
      style={styles}
      maxLength = {maxLength()}  
    />
  );
};

export default TextInput;