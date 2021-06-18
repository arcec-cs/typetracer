import React from 'react';
//displays information about a Title and relevant metadata
const TitleCard = ({title, author, category,  words, id, authorId, categoryId, titleClick, itemClick}) => {
  return ( 
    <article class="center mw5 mw6-ns ba mv4">
      <h1
      id={id}
      title={title} 
      class="measure f4 bg-near-black white mv0 pv2 ph3 underline pointer"
      onClick={titleClick}
      >{title}</h1>
      <div class="pa3 bt">
        <ul className= 'list'>
          <li>{`Author: `}<span id={`authors/${authorId}`} className='underline pointer' onClick={itemClick}>{author}</span></li>
          <li>{`Category: `}<span id={`categories/${categoryId}`} className='underline pointer' onClick={itemClick}>{category}</span></li>
          <li>{`Words: ${words}`}</li>
        </ul>
      </div>
    </article>
  );
}
export default TitleCard;