import React from 'react';
import Sentence from './Sentence';
import './paragraph.css'
//paragraph semantically handles formatting of paragraphs 
const Paragraph = ({text, senCur, isCorrect, charStart, charEnd}) => {
  //get sentences of page, only current sentence of current page needs styling props
  const sentenceList = text.map((sen, ind) => {
    if(ind != senCur) return <Sentence text = {sen}/>
    else {
      return <Sentence 
        text = {sen}
        isCorrect = {isCorrect}
        charStart = {charStart}
        charEnd = {charEnd}
      />
    }
  });
  
  return (
    <p className = {'measure lh-copy indent-custom red-m green-l f6 f5-m f4-l mb mb-m mb-l'}  >
      {sentenceList}
    </p>
  )
};

export default Paragraph;