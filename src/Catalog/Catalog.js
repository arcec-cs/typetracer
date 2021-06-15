import React, {Component } from 'react';
import TitleCard from './TitleCard';
import titleEntries from './temp/titles.json'
import authors from './temp/authors.json'
import BucketList from './BucketList';
import TitleCardList from './TitleCardList';

class App extends Component {
  constructor(props) { 
    super(props);
    
    this.state = { 
      //browse: 'titles'
    }
  }

  componentDidMount() {
    // check local storage for titleEntries if user has been on catalog before
    if(localStorage.getItem('titleEntries') === null){
      const fetchedTitleInfo = titleEntries; //currently fetching all titles in db
      localStorage.setItem('titleEntries', JSON.stringify(titleEntries)) // localstorage only store strings
    }
    this.setState({}); //to get to re-render for 
  }  
  componentDidUpdate() {   
  }
  
  render() {
    const titleEntries = JSON.parse(localStorage.titleEntries);
    return (
      <div name='CatalogContainer' className=''> 
        {/* {titleEntries != null && <TitleCardList titleInfoArr={titleEntries}/>} */}
        <BucketList type='author' info={authors}/>
      </div> 
    );
  }
}
 export default App;