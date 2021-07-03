import React from 'react';
import './CatalogHeader.css'
// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const CatalogHeader = ({onBrowseByClick, selected}) => {
  //browesByBar contional styles
  const stylesNotSelected = 'underline fw9 i bg-moon-gray white ';
  const stylesSelected = 'bg-animate pointer hover-bg-gray hover-white ';
  const stylesSelectedAndInBucket = `${stylesNotSelected} ${stylesSelected}`;
  //determine what is selected and generate styles
  const isSelected = (bbText) => selected.includes(bbText);
  const isInBucket = () => selected.includes('/'); // selected is a path i.e authors/30
  const style = (bbText) => isSelected(bbText) ? isInBucket() ? stylesSelectedAndInBucket: stylesNotSelected: stylesSelected; 
  
  return( 
  <header className='pt2 pt3-ns tc black-80 avenir shadow-5'>
    <h1 id='catalogHeader' className='mt2 mb0 baskerville i fw1'>Catalog</h1>
    <h2 className='mt2 mb0 f6 f5-l fw4 ttu tracked'>{'Browse By:'}</h2>
    <nav id='browseByBar' className='bt tc center mt3'>
      <a id='titles' onClick ={onBrowseByClick} className={`f5 f4-ns link black-80 dib pa3 ph4-m ph5-l w-30-ns w-33 ${style('titles')}`}>{'Texts'}</a>
      <a id='authors' onClick ={onBrowseByClick} className={`f5 f4-ns link black-80 dib pa3 ph4-m ph5-l w-30-ns w-33 ${style('authors')}`}>{'Authors'}</a>
      <a id='categories' onClick ={onBrowseByClick} className={`f5 f4-ns link black-80 dib pa3 ph4-m ph5-l w-30-ns w-34 ${style('categories')}`}>{'Categories'}</a>
    </nav>
  </header> 
  );
}
export default CatalogHeader;