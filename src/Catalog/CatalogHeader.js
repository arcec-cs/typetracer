import React from 'react';
import './CatalogHeader.css'

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const CatalogHeader = ({onBrowseByClick, selected}) => {
  const isSelected = (id) => selected.includes(id) ?'underline fw9 i bg-moon-gray white' : 'bg-animate pointer hover-bg-gray hover-white'
  const selectedText = (id, str) => selected.includes(id) ? `${str}` :  str
  return( 
  <header className='pt2 pt3-ns tc black-80 avenir shadow-5'>
    <h1 id='catalogHeader' className='mt2 mb0 baskerville i fw1'>Catalog</h1>
    <h2 className='mt2 mb0 f6 f5-l fw4 ttu tracked'>Browse By:</h2>
    <nav id='browseByBar' className='bt tc center mt3'>
      <a id='titles' onClick ={onBrowseByClick} className={`f5 f4-ns link black-80 dib pa3 ph4-m ph5-l w-30-ns w-33 ${isSelected('titl')}`}>{'Texts'}</a>
      <a id='authors' onClick ={onBrowseByClick} className={`f5 f4-ns link black-80 dib pa3 ph4-m ph5-l w-30-ns w-33 ${isSelected('author')}`}>{'Authors'}</a>
      <a id='categories' onClick ={onBrowseByClick} className={`f5 f4-ns link black-80 dib pa3 ph4-m ph5-l w-30-ns w-34 ${isSelected('categ')}`}>{'Categories'}</a>
    </nav>
  </header> 

  );
}
export default CatalogHeader;