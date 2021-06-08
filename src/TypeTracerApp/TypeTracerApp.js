import React, { Component } from 'react';
import fetchedText from './temp/ink-text2600.json'

import Page from './Page/Page'

class TypeTracerApp extends Component {
  constructor(props) {
    super(props);
    
    //have to load text from AWS 3S 
    this.text = fetchedText; 
 
    this.indexer = { //keeps track of typing postion in book, will load user progress from Ttracer db
      para : 0,
      sen : 0, 
      c_start: 0 
    };
    
    this.state = { 
      currentPage: 1
    };
  }

  onTextInputChange = (event) => {
    const userInput = event.target.value
    this.setState({textInput: userInput});
  }

  render() {
    let pageText = this.text[this.state.currentPage]    
    return (
      <div className='vh-100'>
        <Page text= {pageText}/>
      </div>
    );
  }
}
 
export default TypeTracerApp;