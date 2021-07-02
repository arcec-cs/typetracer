import React from 'react';
import './MyTextsHeader.css'

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const MyTextsHeader = ({name, date}) => { 
  return( 
  <header className='bg-white black-80 pt4 avenir center'>
    <h1 id='myTextsHeader' className='mt2 mb0 pb0 baskerville i fw1 f1 f-subheadline-l f-header-m tc center'>{`My Texts`}</h1>
    <div className='w-custom center flex justify-between mb3'>
      <h3 id='myTextsName' className='mb0 f5 f4-l'>{'Name:  '} <span className='normal'>{`${name}`}</span></h3>
      <h3 className='mb0 f5 f4-l w-40 tr'>{'Joined:  '} <span className='normal'>{`${date}`}</span></h3>
    </div> 
    <div id='myTextsDivider' className='h1 bb bt center'></div>
  </header> 
  );
}
export default MyTextsHeader;