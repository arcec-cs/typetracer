import React from 'react';

const NextPageButton = ({onClick}) => {
  return(  
    <button 
    id='Next' 
    onClick={onClick} 
    className="f5 no-underline black bg-animate hover-bg-black-no-focus hover-white-no-focus pointer inline-flex items-center pa2 ba border-box"
    >
      <span className=" dn di-ns pr1">Next</span>
      <svg className="w1" data-icon="chevronRight" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
        <title>chevronRight icon</title>
        <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z"></path>
      </svg>
    </button>
  );
};

export default NextPageButton;