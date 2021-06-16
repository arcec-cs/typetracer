import React, {Component } from 'react';
import titleEntries from './temp/titles.json'
import authors from './temp/authors.json'
import BucketList from './BucketList';
import TitleCardList from './TitleCardList';
import CatalogHeader from './CatalogHeader'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
class App extends Component {
  constructor(props) { 
    super(props);
    
    this.state = { 
      browse: 'titles'
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

  getCurrentDisplay(){
    //for api calls
    const loader = <span className='tc'><Loader type="ThreeDots" color="#000000" height={80} width={80} timeout={20000}/></span>;
    
    //conditionally render content of the Catalog page based of browse state
    const browse = this.state.browse; 
    if(browse === 'titles') 
      if(localStorage.titleEntries) return <TitleCardList titleInfoArr={JSON.parse(localStorage.titleEntries)}/>;//check localstorage for content
      else return loader;// if not fetch and indicate loading to user
    else if(browse == 'authors')
      if (localStorage.authors) return <BucketList type='author' info={localStorage.authors}/>;
      else return loader;
    else if(localStorage.categories) return <BucketList type='category' info={localStorage.categories}/>;
      else return loader;
  }
 
  
  render() {
    let titleEntries = localStorage.titleEntries; // react throws CORS in chrome when JSON.parse is given null
    if(titleEntries != null) titleEntries = JSON.parse(localStorage.titleEntries)
    
    const display = this.getCurrentDisplay(); // conditionally render display acc this.state.browse
   
    return (
      <div name='CatalogContainer' className=''> 
        <CatalogHeader/>
        {display}
      </div> 
    );
  }
}
 export default App;