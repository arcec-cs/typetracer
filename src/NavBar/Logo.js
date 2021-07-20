import React from "react";

const Logo = ({routeChange}) => {
  return ( 
  <a 
  style ={{cursor: 'pointer'}} 
  className={"link f2 times white pt1 pb1 pl3 pr3 ml3-ns mr3-ns"}
  onClick={() => routeChange('landingPage')}
  >
    {'Typetracer'}
  </a>);
}

export default Logo;
