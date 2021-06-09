import React from 'react';

//Sentence breakes the text into spans of chars so they may be individulally styled
//charEnd, charStart, and isCorrect refer to current word being typed

const Sentence = ({text, isCorrect, charStart, charEnd}) => { 
   console.log(`sentence: isC: ${isCorrect} S: ${charStart} E: ${charEnd}`)
  const charArray = text.split('');// get each character in the text
  let charList;
  
  if(isCorrect != undefined) { // dynamically created current sentence
    charList = charArray.map((char, ind) => {
      // marker for last char in the current word 
      if(ind == charEnd)  { console.log(char)
        if (isCorrect) return <span className={"underline bg-light-green"}>{char}</span>
        else return <span className={" strike underline bg-light-red"}>{char}</span>
      }
      //styling for typed letters current word
      if(ind >= charStart && ind <= charEnd) {
        if(isCorrect){
          return <span className={"dark-green"}>{char}</span>
        } else return  <span className={"strike dark-red"}>{char}</span>
      } else return <span>{char}</span>
    });
  } else { //not current word no styling
    charList = charArray.map(char => <span>{char}</span>);
  }

  return (
    <span>{charList}</span>
  )
};

export default Sentence;