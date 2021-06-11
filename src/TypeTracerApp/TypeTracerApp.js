import React, { Component } from 'react';
import fetchedText from './temp/ink-text2600.json' //locally loaded, will be fetched in production
import './TypeTracerApp.css';
import Page from './Page/Page'
import InputBar from './InputBar/InputBar'

class TypeTracerApp extends Component {
  constructor(props) {
    super(props);
    
    //have to load text from AWS 3S /TypeTracerDB 
    this.text = {}; //holds paginated book
    this.furthestIndexStore = {page: 1, para: 0, sen: 0, c_start: 0} //keeps track of furthest progress, fetched from Ttracer db

    //states used to manipulate page
    this.textOnPage = []; //will consist of already typed text and text the user is typing
    this.indexer = {page: 1, para: 0, sen: 0, c_start: 0}; //keeps track of typing postion in book
    this.isInputCorrect = true; // says if textInput matches expected input, not state bc changes before & with textInput state already
    
    this.state = { 
      textInput: '',
    };
  }

  componentDidMount(){ let test =
    //make network request here to fetch data from s3/TypeTracer db
    this.text = fetchedText; //Book text fetched form S3
    this.furthestIndexStore = {page: 5, para: 4, sen: 0, c_start: 0 }//fetched from TT db
    this.indexer = Object.assign({}, this.furthestIndexStore) // users starts at lastest progress
    this.furthestPageBuilder(); // build furthest page
    this.setState({}); //to get to re-render for 
  }

  onTextInputChange = (event) => { //pubclassfeild syntax sets on method instance/ normal func on prototype
    const indexer = this.indexer;

    //check user input word by word; a word is "word" + " "
    const userInput = event.target.value;
    const expectedInput = this.text[indexer.page][indexer.para][indexer.sen].slice(indexer.c_start, indexer.c_start + userInput.length);
    const isInputCorrect = userInput == expectedInput; 

    this.isInputCorrect = isInputCorrect;//passed down to set styles on current word being typed
    console.log(`userInput: ${userInput} | expectedInput  ${expectedInput} ; isCorrect: ${isInputCorrect}`);
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
  setIndexes(input) { // called for newWord
    const fIndex = this.furthestIndexStore;
    const indexer = this.indexer;
    const text = this.text;
   
    //already passed conditon for new word. move to starting index
    indexer.c_start = indexer.c_start + input.length;  
    if(indexer.page == fIndex.page) fIndex.c_start = indexer.c_start;
   
    //index markers
    const indexEOSen = text[indexer.page][indexer.para][indexer.sen].length - 1;
    const isEOSen = (indexer.c_start > indexEOSen); // c_start was indexed past sentence bounds of the sentence
    console.log(`page: ${indexer.page} para:${indexer.para} sen:${indexer.sen} `)
    //if End Of significant text, figure out which case and set this.indexer/ add to textOnPage
    if(isEOSen) { 
      //EO index markers 
      const indexEOPara = text[indexer.page][indexer.para].length - 1; 
      const indexEOPage = text[indexer.page].length -1;
      //EO boolean
      const isEOPara = (indexer.sen == indexEOPara); //at the last sentence of para
      const isEOPage = (indexer.para == indexEOPage); // at last paragraph of page
      
      //Check Cases: we always set indexes, if on furthest page we also append to the page.
      if(!isEOPara) { //end of sentence in a paragraph but not the last one
        indexer.sen = indexer.sen + 1; //increment EO
        //reset indexes
        indexer.c_start = 0; 
        //If Furthest, Append Sen: next sentence of para
        if(indexer.page == fIndex.page) {
          this.textOnPage[indexer.para].push(this.text[indexer.page][indexer.para][indexer.sen]);
          fIndex.sen = indexer.sen; 
        }
      } 
      else if(isEOPara && !isEOPage) { //at last sentence in paragraph
        indexer.para = indexer.para + 1; //increment EO 
        //reset indexes
        indexer.c_start = 0; 
        indexer.sen = 0;
        //Append Para: init and add first sen
        if(indexer.page == fIndex.page) { //if furthest page we write to it 
          this.textOnPage.push([]); // init next para
          console.log()
          this.textOnPage[indexer.para].push(this.text[indexer.page][indexer.para][indexer.sen]);
          fIndex.para = indexer.para;
        }
      }
      else if(isEOPara && isEOPage) {
        //reset incrementors to begining of page upon completion
        indexer.para = indexer.sen = indexer.c_start = 0;
        //if Unlocked next page!Increment furthest index store to begining of next page
        if(indexer.page == fIndex.page){//if furthest page
          fIndex.page++;
          fIndex.para = fIndex.sen = fIndex.c_start = 0;
        } 
      }   
    }  
  }

  onPageFlip = (event) => {
    let indexer = this.indexer;
    let fIndex = this.furthestIndexStore;

    const buttonId = event.currentTarget.id; //currentTarget points to where handler is bound
    indexer.page = (buttonId == 'Next' ? (indexer.page + 1) : (indexer.page - 1));
    console.log(indexer.page)
    //set textOnPage of page pageNum; 
    if(indexer.page == this.furthestIndexStore.page) { 
      this.furthestPageBuilder(); //build part of the page which was typed
      indexer.c_start = fIndex.c_start;//set indexer to furthestIndexes, progress on the furthest page
      indexer.sen = fIndex.sen;
      indexer.para = fIndex.para;
    } else { //already typed whole page, render whole page and start at begining
      this.textOnPage = this.text[indexer.page];
      indexer.c_start = indexer.sen = indexer.para = 0; //reset indexes to beginning of page 
    } 
    //set state to reset text input to rerender/user input does not apply to next page
    this.setState({textInput: ''});
  }

  furthestPageBuilder() {
    //reset textOnPage
    this.textOnPage = [];
    const fIndex= this.furthestIndexStore;
    //Build:iterate though para and sen of the page to get to furthest indexes and store in textOnPage
    for(let p = 0; p <= fIndex.para; p++) {
      this.textOnPage.push([]); //init new para array
      let senEnd = (p == fIndex.para) ? fIndex.sen // add only written setence of the furthest paragraph
      : this.text[fIndex.page][p].length -1; //add all sentences of already written paragraphs
      for(let s = 0; s <= senEnd; s++) {
        this.textOnPage[p].push(this.text[fIndex.page][p][s]);
      }
    }
  }

  render() {
    const indexer = this.indexer;
    console.log(indexer)
    console.log(this.furthestIndexStore) 
    //console.log(`text: ${this.textOnPage} isC: ${this.isInputCorrect} para: ${indexer.para} sen: ${indexer.sen} charS: ${indexer.c_start} charE: ${indexer.c_start + this.state.textInput.length}`)  
    return (
      <div className = 'vh-100 flex justify-center'>
        <div className='ma2 w-custom w-custom-m w-custom-l'>
          <Page 
            text={this.textOnPage}
            isCorrect={this.isInputCorrect}
            paraCur={indexer.para}
            senCur={indexer.sen}
            charStart={indexer.c_start}
            charEnd={indexer.c_start + this.state.textInput.length}
          />
          <InputBar
            hasNextButton={indexer.page < this.furthestIndexStore.page}
            hasLastButton={indexer.page != 1}
            onButtonClick={this.onPageFlip} 
            textInput={this.state.textInput} 
            onTextInputChange={this.onTextInputChange}
            currentPage={indexer.page}
          />
        </div>
      </div>
    );
  }
}
 
export default TypeTracerApp;