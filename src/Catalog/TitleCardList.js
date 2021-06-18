import React from 'react';
import TitleCard from './TitleCard';
const TitleCardList = ({titleInfoArr, onTitleClick}) => {
  return ( 
    titleInfoArr.map(titleInfo => 
      <TitleCard 
        key={titleInfo.id}
        id={titleInfo.id}
        title={titleInfo.title}
        author={titleInfo.author} 
        category={titleInfo.category} 
        words={titleInfo.words}
        titleClick={onTitleClick} 
      />)
  );
}
export default TitleCardList;