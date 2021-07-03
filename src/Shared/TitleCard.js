import React from 'react';
import './TitleCard.css'
//displays information about a Title and relevant metadata
const TitleCard = ({title, author, category,  pages, pageProgress,  id, authorId, categoryId, lastAccessed, titleClick, itemClick, type}) => {
  const isTypeX = (bucket) => (type) && type.includes(bucket) ? true : false
  const clickableStyle = 'underline pointer hover-light-red';
  //myTexts does not have itemClick
  const getClassName = (bucket) => itemClick ? type && isTypeX(bucket) ? '' : clickableStyle :''; 
  return ( 
    <article id='titleCard' className='flex center mv4'>
      <div className='flex w-100'>
        <span name="spacer" className='w-20 dn-nl bg-transparent'></span>
        <h1
        id={id}
        title={title} 
        className='flex flex-column justify-center h-100 w-100 mv0 pv2 ph3 ph4-l
        tc f4 white bg-near-black underline pointer grow hover-light-red'
        onClick={titleClick}
        >{title}</h1>
      </div>
      <div className='w-40 pa2 ph3-ns tl bb bt br'>
        <ul id='titleInfoList' className='list pl0 mb0 mv2 flex flex-column justify-between'>
          <li className='pv1'>
            <span className={'b'}>{`Author: `}</span>
            <span id={`authors/${authorId}`} className={`${getClassName('author')}`} onClick={itemClick}>
              {author}
            </span>
          </li>
          <li className='pv1'>
            <span className={'b'}>{`Category: `}</span>
            <span id={`categories/${categoryId}`} className={`${getClassName('categ')}`} onClick={itemClick}>
              {category}
            </span> 
          </li>
          <li className={`pv1`}>
            { (itemClick) ? <span className=''><span className={'b'}>{`Pages:`}</span> {`${pages}`}</span>
              : <span><span className={'b'}>{`Pages Completed:`}</span>{`${pageProgress}/${pages}`}</span>
            }
          </li>
          { (lastAccessed) && 
            <li className='pv1'>
              <span className={'b'}>{`Last Accessed: `}</span>
              {`${new Date(lastAccessed * 1000).toString().slice(0, 21)}`}
            </li>
          }
        </ul>
      </div>
    </article>
  );
}
export default TitleCard;