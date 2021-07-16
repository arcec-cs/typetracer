import React from 'react';
import Sentence from './Sentence';
import './paragraph.css'
//paragraph semantically handles formatting of paragraphs 
const Paragraph = ({text, senCur, isCorrect, charStart, charEnd}) => {
  //get sentences of page, only current sentence of current page needs styling props
  const sentenceList = text.map((sen, ind) => {
    if(ind != senCur) return <span key={ind}>{sen}</span>
    else {
      return <Sentence
        key={ind} 
        text = {sen}
        isCorrect = {isCorrect}
        charStart = {charStart}
        charEnd = {charEnd}
      />
    }
  });
  
  return (
    <p className = {'center measure lh-copy indent-custom red-m green-l f5 f4-l mb mb-m mb-l'}  >
      {sentenceList}
    </p>
  )
};

export default Paragraph;