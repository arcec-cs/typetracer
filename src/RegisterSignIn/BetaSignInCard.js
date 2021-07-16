import React from 'react';

//For Beta testers so they do not have to type in many pages as a new user in order to test out page navigation
const BetaSignInCard = ({click}) => {
  return ( 
    <p onClick={click} className=' bg-light-green ba pa1 mt4 pointer grow bg animate hover-bg-green' >
      <span className='b'> {`Welcome To the Typetracer Beta: `}</span>
      <span>{`Feel free to Sign-In with Username:`} </span> 
      <span className='b underline'>{`test@test.com`}</span>
      <span> {`Password:`} </span>
      <span className='b underline' >{`password`}</span> 
      <span> {`to test Typetracer App page navigation`}</span>
    </p>
  );
}
export default BetaSignInCard;