import React from 'react';
import TextInput from './TextInput';
import NextPageButton from './NextPageButton';
import LastPageButton from './LastPageButton'

const InputBar = ({textInput, onTextInputChange, hasNextButton, hasLastButton, onButtonClick}) => {
  return(  
    <section className = 'flex'>
       <TextInput 
          value={textInput} 
          textInputChange={onTextInputChange}
        />
        {hasLastButton && <LastPageButton onClick={onButtonClick} />}
        {hasNextButton && <NextPageButton onClick={onButtonClick}/>}  
    </section>
  );
};

export default InputBar;