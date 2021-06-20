import React from 'react';

// BucketList component used to make a list of categories or authors, the two "buckets" which Texts go in
const BucketList = ({type, info, onItemClick}) => {
  const header = (type === 'author' ? 'Authors:' : 'Categories:');
  const pathFirst = (type === 'author' ? 'authors' : 'categories');
  const list = info.map(entry =>
     <li
     onClick={onItemClick} 
     id={`${pathFirst}/${entry['id']}`}
     key={`${entry['id']}`} 
     className='f3-l ph3 pv3 bb b--light-silver underline pointer'>
      {entry[type]}
    </li>);

  return ( 
  <article style={{paddingTop: '0'}} className='pa3 pa4-ns'>
    <h1 className='f3 f2-l bold center mw6 mw7-l mt0'>{header}</h1>
    <ul className='list pl0 ml0 center mw6 mw7-l ba b--light-silver br2'>
      {list}
    </ul>
  </article>
  );
}
export default BucketList;