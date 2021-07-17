import React,{useState, useEffect} from 'react';
import TitleCard from './TitleCard';
const TitleCardList = ({titleInfoArr, type, onTitleClick, onItemClick}) => { 
  //state titleInfoArrRec to hold previous cards for each render 
  const[titleInfoArrRec, setTitleInfoArrRec] = useState(titleInfoArr.slice(0,5));
  //recursively set state to render cards 5 at a time for titleInfoArr is large and causes studder if rendered all at once
  useEffect(() => { 
    (function recursive () {
      setTimeout(() => {
        let hasMore = titleInfoArrRec.length + 5 < titleInfoArr.length;
        setTitleInfoArrRec((prevTitleInfoArrRec) => titleInfoArr.slice(0, prevTitleInfoArrRec.length + 5));
        if (hasMore) recursive();
      }, 0);//set timeout so users can still interact with UI
    })()
  }, []);// [] never changes so only runs on mount

  return ( 
    titleInfoArrRec.map(titleInfo => 
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