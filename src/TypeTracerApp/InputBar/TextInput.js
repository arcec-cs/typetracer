import React, {useState} from 'react';
import * as smoothscroll  from 'smoothscroll-polyfill';
smoothscroll.polyfill(); //for safari

const TextInput = ({value, textInputChange, styles, canType}) => {
  const maxLength = () => canType ? '1000' : '0'; // valdiation but allow copying long sentences("feature")
  //need to know isIOS to accomidate soft keyboard and scrolling behavior 
  //kb behav (pushes up viewport and allows scroll to empty vp) also scrolling to CW on ios causes scrolling bug below our body(bad UX)
  const [isIOS, setIsIOS] = useState(('GestureEvent' in window)); //gesture proprietary interface for webkit
  const scrollToCurrentWord = () => {
    (!isIOS) ? //check current word not null i.e at start of app 
    document.getElementById('currentWord') && document.getElementById('currentWord').scrollIntoView({behavior: 'smooth'}) : //on scroll to current word for good ux
    setTimeout(()=> window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 150); //accommodate keyboard pushing up viewport behavior
  }  
  return(  
    <input 
      autoFocus={!isIOS}
      className={"input-reset ba b--black-20 pa2 db w-34 border-box"} 
      value={value} 
      onChange={textInputChange}
      style={styles}
      maxLength = {maxLength()} 
      onFocus={scrollToCurrentWord} 
    />
  );
};
export default TextInput;