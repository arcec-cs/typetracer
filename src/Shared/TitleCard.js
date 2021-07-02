import React from 'react';
import './TitleCard.css'
//displays information about a Title and relevant metadata
const TitleCard = ({title, author, category,  pages, pageProgress,  id, authorId, categoryId, lastAccessed, titleClick, itemClick, type}) => {
  const isTypeX = (bucket) => (type) && type.includes(bucket) ? true : false
  const clickableStyle = 'underline pointer';
  //myTexts does not have itemClick
  const getClassName = (bucket) => itemClick ? type && isTypeX(bucket) ? '' : clickableStyle :''; 
  const classNamePageLi = itemClick && 'tc-ns'
  const classNamePageUl = itemClick && 'self-center'
  return ( 
    <article className='center w-custom ba mv4'>
      <span className='bg-near-black w-100 dib'>
      <h1
      id={id}
      title={title} 
      className='content-box measure f4 white mv0 pv2 ph4 underline pointer tc'
      onClick={titleClick}
      >{title}</h1>
      </span>
      <div className='pa2 ph4 bt flex-ns justify-around'>
        <ul className='list pl0 mt1 mb0 mv1-ns mr1-ns ml4-ns mv2-ns w-34-l w-40-m'>
          <li className='pv1'>
            <span className={'b'}>{`Author: `}</span>
            <span id={`authors/${authorId}`} className={`${getClassName('author')}`} onClick={itemClick}>
              {author}
            </span>
            </li>
          <li className='pv1 pv2-ns'>
            <span className={'b'}>{`Category: `}</span>
            <span id={`categories/${categoryId}`} className={`${getClassName('categ')}`} onClick={itemClick}>
              {category}
            </span> 
          </li>
        </ul>
        <ul className={`list pl0 mt0 mb1 mv2-ns ml1-ns mr4-ns w-34-l w-40-m ${classNamePageUl}`}> 
          <li className={`pv1 ${classNamePageLi}`}>
            { (itemClick) ?   <span className='tc'><span className={'b'}>{`Pages:`}</span> {`${pages}`}</span>
              : <span><span className={'b'}>{`Pages Completed:`}</span> {`${pageProgress}/${pages}`}</span>
            }
          </li>
          {lastAccessed && <li className='pv1 pv2-ns'>
            <span className={'b'}>{`Last Accessed: `}</span>
            {`${new Date(lastAccessed * 1000).toString().slice(0, 21)}`}
          </li>}
        </ul>
      </div>
    </article>
  );
}
export default TitleCard;