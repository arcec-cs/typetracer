import React from 'react';

const LastPageButton = ({onClick}) => {
  return(  
    <button id='Last' onClick={onClick} className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
      <svg className="w1" data-icon="chevronLeft" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
        <title>chevronLeft icon</title>
        <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
      </svg>
      <span className="pl1">Last</span>
    </button>
  );
};

export default LastPageButton;