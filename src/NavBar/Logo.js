import React from "react";

const Logo = ({click}) => {
  return ( 
  <a 
  style ={{cursor: 'pointer'}} 
  className={"link f2 times white pt1 pb1 pl3 pr3 ml3-ns mr3-ns"}
  onClick={click}
  >
    {'Typetracer'}
  </a>);
}

export default Logo;
