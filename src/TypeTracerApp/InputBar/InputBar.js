import React from 'react';
import TextInput from './TextInput';
import NextPageButton from './NextPageButton';
import LastPageButton from './LastPageButton';

const InputBar = ({textInput, onTextInputChange, hasNextButton, hasLastButton, onButtonClick , currentPage}) => {
  return(  
    <section className = 'flex justify-between mt1'>
       <TextInput 
          value={textInput} 
          textInputChange={onTextInputChange}
        />
        <span className='self-center'>{`Page #: ${currentPage}`}</span>
        <div name='lastNextButtonContainer' className='flex justify-end w-34-m w-30'>
           <span style={{marginRight: 'auto'}}>{hasLastButton && <LastPageButton onClick={onButtonClick}/>}</span>
           <span>{hasNextButton && <NextPageButton onClick={onButtonClick}/>}</span> 
        </div>
    </section>
  );
};

export default InputBar;