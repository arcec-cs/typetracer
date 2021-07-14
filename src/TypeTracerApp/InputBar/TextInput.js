import React, {useEffect} from 'react';
import * as smoothscroll  from 'smoothscroll-polyfill';
smoothscroll.polyfill(); //for safari

const TextInput = ({value, textInputChange, styles, canType}) => {
  const maxLength = () => canType ? '1000' : '0';
  const scrollToCurrentWord = () =>{ //check current word not null i.e at start of app
    document.getElementById('currentWord') && document.getElementById('currentWord').scrollIntoView({behavior: 'smooth'});  
    setTimeout(()=>{ // to accomidate keyboard ios
      document.getElementById('NavBar').scrollIntoView({behavior: 'smooth'});
      //disableBodyScroll(document.getElementById('ttAppPage'))
    }, 150)
    
  }
    useEffect(() => {
      const navBar = document.getElementById('NavBar')
      function noScroll(event) {
        event.preventDefault();
        navBar.scrollIntoView({behavior: 'smooth'});
      }
      
      // add listener to disable scroll
      //window.addEventListener('scroll', noScroll);
      //('GestureEvent' in window) && document.addEventListener('gesturechange', noScroll)
      if('TouchEvent' in window) { 
        document.addEventListener("touchmove", noScroll); //start of scroll for ios
        document.addEventListener("scroll", noScroll); //end of scroll ios
      }
      return () => {
      // Remove listener to re-enable scroll
      //window.removeEventListener('scroll', noScroll);
      //('GestureEvent' in window) && document.removeEventListener('gesturechange', noScroll)
      if('TouchEvent' in window) { 
        document.addEventListener("touchmove", noScroll);
        document.addEventListener("scroll", noScroll);
      }
      }
    }, []);// [] never changes so only runs on mount
  return(  
    <input 
      autoFocus
      className={"input-reset ba b--black-20 pa2 db w-34 border-box"} 
      value={value} 
      onChange={textInputChange}
      style={styles}
      maxLength = {maxLength()} 
      onFocus={scrollToCurrentWord} 
      //onTouchEnd={scrollToCurrentWord}
    />
  );
};
//document.getElementById('currentWord').scrollIntoView({behavior: "smooth", alignToTop: "true"})
export default TextInput;