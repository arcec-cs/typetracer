import React from 'react';
import Sentence from './Sentence';
import './paragraph.css'
//paragraph semantically handles formatting of paragraphs 
const Paragraph = ({text, isCorrect, charStart, charEnd}) => {
  const sentenceList = text.map(sen => 
    <Sentence 
      text = {sen}
      isCorrect = {isCorrect}
      charStart = {charStart}
      charEnd = {charEnd}
    />
  );

  return (
    <p className = {'center measure lh-copy indent-custom  red-m green-l f6 f5-m f4-l mb mb-m mb-l'}  >
      {sentenceList}
    </p>
  )
};

export default Paragraph;