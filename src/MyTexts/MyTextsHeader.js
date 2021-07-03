import React from 'react';
import './MyTextsHeader.css'

const MyTextsHeader = ({name, date}) => { 
  return( 
  <header className='bg-white black-80 pa2 avenir center w-custom shadow-5 w-100'>
    <h1 id='myTextsHeader' className='mt2 mb0 pb0 baskerville i fw1 f1 tc'>{`My Texts`}</h1>
    <div className='flex mw7 w-50-l w-75-m w-100 center f5 f4-ns'>
      <h3 id='myTextsName' className=' mb0 pr2'>{'Name:  '} <span className='normal'>{`${name}`}</span></h3>
      <h3 className='mb0 tr pl2 w-50'>{'Joined:  '} <span className='normal'>{`${date}`}</span></h3>
    </div> 
  </header> 
  );
}
export default MyTextsHeader;