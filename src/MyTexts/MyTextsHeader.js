import React from 'react';

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const MyTextsHeader = ({name, date}) => { 
  return( 
  <header className='bg-white black-80 pv4 avenir'>
    <h1 className='mt2 mb0 baskerville i fw1 f1 f-subheadline-ns tc'>{`My Texts`}</h1>
    <div className='w-custom center '>
    <h3 style={{overflowWrap: 'anywhere'}} className='mb0 f5 f4-ns'>{'Name:  '} <span className='normal'>{`${name}`}</span></h3>
    <h3 className='mb0 f5 f4-ns'>{'Joined:  '} <span className='normal'>{`${date}`}</span></h3>
    </div> 
  </header> 

  );
}
export default MyTextsHeader;