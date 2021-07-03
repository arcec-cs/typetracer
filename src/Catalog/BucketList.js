import React from 'react';

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const BucketList = ({type, info, onItemClick}) => {
  const header = (type === 'author' ? 'Authors:' : 'Categories:');
  const pathFirst = (type === 'author' ? 'authors' : 'categories');
  
  let firstLetterStore;// so we know at beg of letter list
  const list = info.map(entry => {
     let stickyBanner;
     const firstLetter = entry[type].slice(0,1);//get first letter
     // if fist letter in letter list create sticky banner
     if(firstLetter != firstLetterStore){
      firstLetterStore = firstLetter
      stickyBanner = <li 
      style={{position:'sticky', top:-1}} 
      className='f3-l ph2 b b--light-silver pv3 ba bg-near-black white'>
        {firstLetter}
      </li>
     }
     return <>
      {stickyBanner} 
      <li
      onClick={onItemClick} 
      id={`${pathFirst}/${entry['id']}`}
      key={`${entry['id']}`} 
      className='f3-l ph3 pv3 bb b--light-silver hover-light-red underline pointer'>
        {entry[type]}
      </li>
    </>
  });

  return ( 
  <article className='pa4 pl4-l pr0-l w-100 center'>
    <ul className='list pl0 mt0 center mw6 mw7-l ba b--light-silver br2'>
      {list}
    </ul>
  </article>
  );
}
export default BucketList;