import React from 'react';
import TitleCard from './TitleCard';
const TitleCardList = ({titleInfoArr}) => {
  return ( 
    titleInfoArr.map(titleInfo => 
      <TitleCard 
        title={titleInfo.title}
         author={titleInfo.author} 
         category={titleInfo.category} 
         words={titleInfo.words} 
      />)
  );
}
export default TitleCardList;