import React from 'react';
//PageNumberInput handler input wrapped in form bc controlled input not needed but can call Form.reset() to clear form
const PageNumberInput = ({inputHandler, placeHolder}) => {
  return( 
    <form onSubmit={inputHandler} className='dib' id='PageNumberInput'> 
      <input
      className={"input-reset ba b--black-20 db mw2 border-box dib"} 
      onBlur={inputHandler}
      style={{maxWidth: "2.25rem"}}
      maxLength='4'
      placeholder ={placeHolder}
      defaultValue=''
      />
    </form> 
  );
};

export default PageNumberInput;