import React from 'react';

const NoTextsBanner = ({routeChange}) => { 
  return( 
    <div className='center tc w-50  mt4'>
          <h2>{'Welcome To TypeTracer, check out our Catalog to get Texts!'}</h2>
          <button 
            style={{outline: 'none'}} 
            className='f4 tc br-pill ph4 pv3 mb2 dib white bg-black bn pointer grow bg-animate hover-bg-gray'
            onClick={() => routeChange('catalog')}
          >{'To Catalog'}</button>
        </div>
  );
}
export default NoTextsBanner;