import React from 'react';
import Paragraph from './Paragraph';

// We want our page to render the current state of the page as we are typing 
// text- shall be the whole text of the page
// isCorrect, charStart and charEnd -shall be used in sub component Sentence for styling of characters 
const Page = ({text, isCorrect, charStart, charEnd}) => {
  //get paragraphs of page
  const paragraphList = text.map(para => 
    <Paragraph 
      text = {para}
      isCorrect = {isCorrect}
      charStart = {charStart}
      charEnd = {charEnd}
    />
  );
 
  return (
    <div className='f4 w-100 pa2 h-75' style={{ overflowY: 'scroll'}}>
      {paragraphList}
    </div>
  );
};

export default Page;