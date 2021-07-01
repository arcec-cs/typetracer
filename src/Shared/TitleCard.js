import React from 'react';
import './TitleCard.css'
//displays information about a Title and relevant metadata
const TitleCard = ({title, author, category,  words, id, authorId, categoryId, titleClick, itemClick, type}) => {
  const isTypeX = (bucket) => (type) && type.includes(bucket) ? true : false
  const clickableStyle = 'underline pointer'
  const getClassName = (bucket) => itemClick && type && isTypeX(bucket) ? '' : clickableStyle;
  return ( 
    <article className='center w-custom ba mv4'>
      <span className='bg-near-black w-100 dib'>
      <h1
      id={id}
      title={title} 
      className='content-box measure f4 white mv0 pv2 ph4 underline pointer'
      onClick={titleClick}
      >{title}</h1>
      </span>
      <div className='pa2 ph4 bt'>
        <ul className='list pl0 mv2'>
          <li className='pv1'>
            <span className={'b'}>{`Author: `}</span>
            <span id={`authors/${authorId}`} className={`${getClassName('author')}`} onClick={itemClick}>
              {author}
            </span>
            </li>
          <li className='pv2'>
            <span className={'b'}>{`Category: `}</span>
            <span id={`categories/${categoryId}`} className={`${getClassName('categ')}`} onClick={itemClick}>
              {category}
            </span>
          </li>
          <li className='pv1'>
            <span className={'b'}>{`Words: `}</span>
            {`${words}`}
          </li>
        </ul>
      </div>
    </article>
  );
}
export default TitleCard;