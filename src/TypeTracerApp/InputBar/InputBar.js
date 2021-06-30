import React from 'react';
import TextInput from './TextInput';
import PageNumberInput from './PageNumberInput'
import NextPageButton from './NextPageButton';
import LastPageButton from './LastPageButton';
import './InputBar.css'

const InputBar = ({textInput, 
  onTextInputChange, 
  hasNextButton, 
  hasLastButton, 
  onButtonClick ,
  currentPage,
  furthestPage,  
  onPageNumberInputHandler
}) => {
  
  return(  
    <section className = 'flex justify-between pt3 mt2 mb3 bt-double f6 f5-ns'>
       <TextInput value={textInput} textInputChange={onTextInputChange}/>
        <span className='w-33 tc self-center'>
          {`Page#: `}
          <PageNumberInput inputHandler={onPageNumberInputHandler} placeHolder={currentPage}/>
          {` /${furthestPage}`}
        </span>
        <div name='lastNextButtonContainer' className='flex justify-end w-34-m w-30 self-center'>
           <span style={{marginRight: 'auto'}}>{hasLastButton && <LastPageButton onClick={onButtonClick}/>}</span>
           <span>{hasNextButton && <NextPageButton onClick={onButtonClick}/>}</span> 
        </div>
    </section>
  );
};

export default InputBar;