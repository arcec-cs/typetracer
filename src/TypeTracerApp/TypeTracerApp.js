import React, { Component } from 'react';
import fetchedText from './temp/ink-text2600.json'

import Page from './Page/Page'
import InputBar from './InputBar/InputBar'

class TypeTracerApp extends Component {
  constructor(props) {
    super(props);
    
    //have to load text from AWS 3S /TypeTracerDB 
    this.text = fetchedText;
    this.progress = { //keeps track of latest progress 
      page: 0,
    }

    //states used to manipulate page
    this.textOnPage = []; //will consist of already typed text and text the user is typing
    this.indexer = { //keeps track of typing postion in book, will load user progress from Ttracer db
      para : 0,
      sen : 0, 
      c_start: 0 
    };
    this.isInputCorrect = true; // says if textInput matches expected input, not state bc changes before & with textInput state already
    
    this.state = { 
      textInput: '',
      currentPage: 1
    };
  }

  componentDidMount(){
    //make network request here to fetch data from s3/TypeTracer db
    const page = this.state.currentPage;
    const indexer = this.indexer;
    // initilize textOnPage with progress 
    for(let p = 0; p <= indexer.para; p++) {
      this.textOnPage.push([]); //init new para array
      for(let s = 0; s <= indexer.sen; s++) {
        this.textOnPage[p].push(this.text[page][p][s]);
      }
    }
    this.setState({}); // to get to re-render  NEW
  }

  onTextInputChange = (event) => { //pubclassfeild syntax sets on method instance/ normal func on prototype
    const indexer = this.indexer;
    const page = this.state.currentPage;

    //check user input word by word; a word is "word" + " "
    const userInput = event.target.value;
    const expectedInput = this.text[page][indexer.para][indexer.sen].slice(indexer.c_start, indexer.c_start + userInput.length);
    const isInputCorrect = userInput == expectedInput; 

    this.isInputCorrect = isInputCorrect;//passed down to set styles on current word being typed
    //console.log(`userInput: ${userInput} | expectedInput  ${expectedInput} ; isCorrect: ${isInputCorrect}`);
    (isInputCorrect && this.isEndOfWord(userInput)) ? this.nextWord(userInput)
    : this.setState({textInput: userInput});
  }

  nextWord = (input) => {
    this.setIndexes(input);
    this.setState({textInput: ''});
  }

  isEndOfWord(input) { // 
    const inputIsEndOfWord = input.includes(" ");
    const inputIsEmpty = (input == ''); //beginning of a word
    return (!inputIsEmpty && inputIsEndOfWord ? true : false);  
  }
  setIndexes(input){ // called for newWord
    const page = this.state.currentPage;
    const indexer = this.indexer;
    const text = this.text;
   
    //already passed conditon for new word. move to starting index
    indexer.c_start = indexer.c_start + input.length;  
   
    //index markers
    const indexEOSen = text[page][indexer.para][indexer.sen].length - 1;
    const isEOSen = (indexer.c_start > indexEOSen); // c_start was indexed past sentence bounds of the sentence

    //if End Of significant text, figure out which case and set this.indexer/ add to textOnPage
    if(isEOSen) { 
      //EO index markers 
      const indexEOPara = text[page][indexer.para].length - 1; 
      const indexEOPage = text[page].length -1;
      //EO boolean
      const isEOPara = (indexer.sen == indexEOPara); //at the last sentence of para
      const isEOPage = (page  == indexEOPage); // at last paragraph of page
      
      //Check Cases
      if(!isEOPara) { //end of sentence in a paragraph but not the last one
        indexer.sen = indexer.sen + 1; //increment EO
        //reset indexes
        indexer.c_start = 0; 
        //Append Sen: next sentence of para
        this.textOnPage[indexer.para].push(this.text[page][indexer.para][indexer.sen]);
      } 
      else if(isEOPara && !isEOPage) { //at last sentence in paragraph
        indexer.para = indexer.para + 1; //increment EO 
        //reset indexes
        indexer.c_start = 0; 
        indexer.sen = 0;
        //Append Para: init and add first sen
        this.textOnPage.push([]); // init next para
        this.textOnPage[indexer.para].push(this.text[page][indexer.para][indexer.sen]);
      }
      // else if(isEOPara && isEOPage) {
      //   this.setState({currentPage: page++}) // increment EO
      //   //reset indexes
      //   indexer.c_start = 0; // reset beg word
      //   indexer.sen = 0;//reset beg sentence
      //   indexer.para = 0; //next para, increment
      //   //Next
      //   this.textOnPage = [[]]
  
      //   //TODO  NEED TO FIGURE OUT IF WE WANT TO AUTO GO TO NEXT PAGE OR HAVE SOME PROMPT
      //   //CURRENTLY FIGURING OUT HOW TO HANDLE MOVING OT NEXT PAGE
      // }
      // recordProgress();   
    }  
  }

  render() {
    const indexer = this.indexer; 
    //console.log(`text: ${this.textOnPage} isC: ${this.isInputCorrect} para: ${indexer.para} sen: ${indexer.sen} charS: ${indexer.c_start} charE: ${indexer.c_start + this.state.textInput.length}`)  
    return (
      <div className = 'vh-100 flex justify-center'>
        <div name className='dib ma2'>
          <Page 
            text={this.textOnPage}
            isCorrect={this.isInputCorrect}
            paraCur={indexer.para}
            senCur={indexer.sen}
            charStart={indexer.c_start}
            charEnd={indexer.c_start + this.state.textInput.length}
          />
          <InputBar 
            textInput = {this.state.textInput} 
            onTextInputChange={this.onTextInputChange}
          />
        </div>
      </div>
    );
  }
}
 
export default TypeTracerApp;