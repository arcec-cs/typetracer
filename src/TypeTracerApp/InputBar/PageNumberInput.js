import React, {useState} from 'react';
import * as smoothscroll  from 'smoothscroll-polyfill';
smoothscroll.polyfill(); //for safari

//PageNumberInput handler input wrapped in form bc controlled input not needed but can call Form.reset() to clear form
const PageNumberInput = ({inputHandler, placeHolder}) => {
  // hooks here to encapuslate component
  const [isIOS, setIsIOS] = useState(('GestureEvent' in window)); //gesture proprietary interface for webkit
  const IOSKbHandler = () => setTimeout(()=> window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 150);//accommodate keyboard pushing up viewport behavior
  return( 
    <form onSubmit={inputHandler} className='dib' id='PageNumberInput'> 
      <input
      className={"input-reset ba b--black-20 db mw2 border-box dib"} 
      onBlur={inputHandler}
      onFocus={() => isIOS ? IOSKbHandler() : 0}
      style={{maxWidth: "2.25rem", width:"2.25rem"}}
      maxLength='4'
      placeholder ={placeHolder}
      defaultValue=''
      />
    </form> 
  );
};

export default PageNumberInput;