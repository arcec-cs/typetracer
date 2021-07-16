import React, {useState, useEffect} from 'react';
import Paragraph from './Paragraph';
import {disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import * as smoothscroll  from 'smoothscroll-polyfill';
smoothscroll.polyfill(); //for safari

// We want our page to render the current state of the page as we are typing 
// text- shall be the whole text of the page
// isCorrect, charStart and charEnd -shall be used in sub component Sentence for styling of characters 
const Page = ({text, isCorrect, paraCur, senCur, charStart, charEnd}) => {
  //To dynamically size page on resize //206 is the size of all the bars
  const [height, setHeight] = useState((window.visualViewport ? window.visualViewport.height : window.innerHeight) - 206 + 'px');
  
  //set eventListener for resize when component mounts, used to size page height based on remianing space
  useEffect(() => {
    //visualViewport to accomidatate mobile devices
    const hasApi = window.visualViewport ? true : false; //check for feature
    const getHeightType = () => hasApi ? () => window.visualViewport.height : () => window.innerHeight; //HOC for closure
    const getHeight = getHeightType(); //use closure so we dont have to check every resize  
    const barOffset = 206; //height of all bars 
    const handleResize = () => setHeight(getHeight() - barOffset + 'px');
    //set event listener, use visualViewport where supported bc accounts for browser UI/keyboards for mobile displays
    if(hasApi) window.visualViewport.addEventListener('resize', () => handleResize());
    else window.addEventListener('resize', () => handleResize());
    
    //for ios, scroll to top of page once mounted, and disable body scroll.IOS pushes Vp up even if body does not take up full screen
    const isIOS = ('GestureEvent' in window); 
    if(isIOS) {
      document.getElementById('NavBar').scrollIntoView({behavior: 'smooth'}); 
      disableBodyScroll(document.getElementById('TTPage'));
    }
    return () => {
      (isIOS) && clearAllBodyScrollLocks();
      hasApi ? //clean up on unmount
      window.visualViewport.removeEventListener('resize', () => handleResize()) :
      window.removeEventListener('resize', () => handleResize());
    }
  }, []);// [] never changes so only runs on mount

   //get paragraphs of page, only current sentence of current page needs styling props
   const paragraphList = text.map((para, ind) =>{
    if(ind != paraCur) return <Paragraph key={ind} text={para}/>
    else {
      return <Paragraph
        key={ind} 
        text={para}
        senCur={senCur}
        isCorrect={isCorrect}
        charStart={charStart}
        charEnd={charEnd}
      />
    }
  });
  return (
    <div id='TTPage' style={{height: height, minHeight:'3em', overflowY: 'scroll'}}>
      {paragraphList}
    </div>
  );
};

export default Page;