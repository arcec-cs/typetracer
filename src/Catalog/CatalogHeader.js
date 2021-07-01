import React from 'react';
import './CatalogHeader.css'

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const CatalogHeader = ({onBrowseByClick}) => {
  return( 
  <header className='bg-white black-80 tc pv4 avenir'>
    <h1 id='catalogHeader' className='mt2 mb0 baskerville i fw1 f1 f-subheadline-l'>Catalog</h1>
    <h2 className='mt2 mb0 f6 f5-l fw4 ttu tracked'>Browse By:</h2>
    <nav id='browseByBar' className='bt bb tc center mt4'>
      <a id='titles' onClick ={onBrowseByClick} className='f5 f4-ns link bg-animate black-80 hover-bg-near-black hover-white dib pa3 ph4-m ph5-l w-30 pointer'>Texts</a>
      <a id='authors' onClick ={onBrowseByClick} className='f5 f4-ns link bg-animate black-80 hover-bg-near-black hover-white dib pa3 ph4-m ph5-l w-30 pointer'>Authors</a>
      <a id='categories' onClick ={onBrowseByClick} className='f5 f4-ns link bg-animate black-80 hover-bg-near-black hover-white dib pa3 ph4-m ph5-l w-30 pointer'>Categories</a>
    </nav>
  </header> 

  );
}
export default CatalogHeader;