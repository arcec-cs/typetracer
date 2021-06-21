import React from 'react';
//displays information about a Title and relevant metadata
const TitleCard = ({title, author, category,  words, id, authorId, categoryId, titleClick, itemClick}) => {
  //dont want underline pointer on myTexts page
  const itemClassName = (itemClick? 'underline pointer': '' ); 
  return ( 
    <article className='center mw5 mw6-ns ba mv4'>
      <h1
      id={id}
      title={title} 
      className='measure f4 bg-near-black white mv0 pv2 ph3 underline pointer'
      onClick={titleClick}
      >{title}</h1>
      <div className='pa2 bt'>
        <ul className='list pl0'>
          <li className='pa1'><span className={'b'}>{`Author: `}</span><span id={`authors/${authorId}`} className={`${itemClassName}`} onClick={itemClick}>{author}</span></li>
          <li className='pa1'><span className={'b'}>{`Category: `}</span><span id={`categories/${categoryId}`} className={`${itemClassName}`} onClick={itemClick}>{category}</span></li>
          <li className='pa1'><span className={'b'}>{`Words: `}</span>{`${words}`}</li>
        </ul>
      </div>
    </article>
  );
}
export default TitleCard;