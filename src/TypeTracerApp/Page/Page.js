import React from 'react';
import Paragraph from './Paragraph';

// We want our page to render the current state of the page as we are typing 
// text- shall be the whole text of the page
// isCorrect, charStart and charEnd -shall be used in sub component Sentence for styling of characters 
const Page = ({text, isCorrect, paraCur, senCur, charStart, charEnd}) => {
  //get paragraphs of page, only current sentence of current page needs styling props
  const paragraphList = text.map((para, ind) =>{
    if(ind != paraCur) return <Paragraph text={para}/>
    else {
      return <Paragraph 
        text={para}
        senCur={senCur}
        isCorrect={isCorrect}
        charStart={charStart}
        charEnd={charEnd}
      />
    }
  });
  
  return (
    <div className='f4 h-75' style={{ overflowY: 'scroll'}}>
      {paragraphList}
    </div>
  );
};

export default Page;