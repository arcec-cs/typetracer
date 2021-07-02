import React from 'react';
import TitleCard from './TitleCard';
const TitleCardList = ({titleInfoArr, type, onTitleClick, onItemClick}) => { 
  console.log(titleInfoArr)
  return ( 
    titleInfoArr.map(titleInfo => 
      <TitleCard 
        key={titleInfo.id}
        id={titleInfo.id}
        title={titleInfo.title}
        author={titleInfo.author} 
        category={titleInfo.category} 
        pages={titleInfo.pages}
        pageProgress={titleInfo.pageProgress}
        authorId={titleInfo.author_id}
        categoryId={titleInfo.category_id}
        lastAccessed={titleInfo.lastAccessed}
        titleClick={onTitleClick}
        itemClick={onItemClick}
        type={type} 
      />)
  );
}
export default TitleCardList;