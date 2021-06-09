import React from 'react';
import TextInput from './TextInput';

const InputBar = ({textInput, onTextInputChange}) => {
  return(  
    <section className = 'flex'>
       <TextInput 
          value={textInput} 
          textInputChange={onTextInputChange}
        /> 
    </section>
  );
};

export default InputBar;