import React from 'react';

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const CatalogHeader = ({onBrowseByClick}) => {
  return( 
  <header className='bg-white black-80 tc pv4 avenir'>
    <h1 className='mt2 mb0 baskerville i fw1 f1 f-subheadline-l'>Catalog</h1>
    <h2 className='mt2 mb0 f6 f5-l fw4 ttu tracked'>Browse By:</h2>
    <nav name='browseByBar' className='bt bb tc mw6 mw7-l center mt4'>
      <a id='titles' onClick ={onBrowseByClick} className='f5 f4-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-m ph5-l pointer'>Texts</a>
      <a id='authors' onClick ={onBrowseByClick} className='f5 f4-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-m ph5-l pointer'>Authors</a>
      <a id='categories' onClick ={onBrowseByClick} className='f5 f4-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-m ph5-l pointer'>Categories</a>
    </nav>
  </header> 

  );
}
export default CatalogHeader;