import React from 'react';
import TitleCard from './TitleCard';
const TitleCardList = ({titleInfoArr, onTitleClick, onItemClick}) => {
  return ( 
    titleInfoArr.map(titleInfo => 
      <TitleCard 
        key={titleInfo.id}
        id={titleInfo.id}
        title={titleInfo.title}
        author={titleInfo.author} 
        category={titleInfo.category} 
        words={titleInfo.words}
        authorId={titleInfo.author_id}
        categoryId={titleInfo.category_id}
        titleClick={onTitleClick}
        itemClick={onItemClick} 
      />)
  );
}
export default TitleCardList;