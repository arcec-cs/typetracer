import React from 'react';

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const MyTextsHeader = ({name}) => { 
  return( 
  <header className='bg-white black-80 tc pv4 avenir'>
    <h1 className='mt2 mb0 baskerville i fw1 f1 f-subheadline-ns'>{`My Texts`}</h1>
    <h3 className='mb0 f5 f4-ns'>{`name: ${name}`}</h3>
  </header> 

  );
}
export default MyTextsHeader;