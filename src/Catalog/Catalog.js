import React, {Component } from 'react';
import titleEntries from './temp/titles.json'
// import authors from './temp/authors.json'
import BucketList from './BucketList';
import TitleCardList from './TitleCardList';
import CatalogHeader from './CatalogHeader'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
class App extends Component {
  constructor(props) { 
    super(props);
    
    this.shouldFetch = false;
    
    this.state = { 
      path: 'titles'
    }
  }

  componentDidMount() {
    const path =  this.state.path;
    if(!localStorage[path])this.fetchpathContent() 
  }  
  componentDidUpdate() { 
    if(this.shouldFetch === true){ this.fetchPathContent();}
  }

  fetchPathContent(){
    const path = this.state.path;
      fetch(`http://localhost:3005/catalog/${path}`)
      .then(res=> res.json())
      .then(data => localStorage[path] = JSON.stringify(data))
      .then(a => console.log(`Fetching: ${localStorage[path]}`))
      .then(a => this.shouldFetch = false)
      .then(a => this.setState({})) //re-render with fetched data
      .catch(error => console.log(error))
  }

  getCurrentDisplay(){
    //for api calls
    const loader = <span className='tc'><Loader type="ThreeDots" color="#000000" height={80} width={80} timeout={20000}/></span>;
    
    //conditionally render content of the Catalog page based of browse state
    const path = this.state.path; 
    if(path === 'titles') 
      if(localStorage.titles) return <TitleCardList titleInfoArr={JSON.parse(localStorage.titles)}/>;//check localstorage for content
      else {this.shouldFetch = true; return loader}// if not fetch and indicate loading to user
    else if(path == 'authors')
      if (localStorage.authors) return <BucketList type='author' info={JSON.parse(localStorage.authors)}/>;
      else {this.shouldFetch = true; return loader}
    else if(localStorage.categories) return <BucketList type='category' info={JSON.parse(localStorage.categories)}/>;
      else {this.shouldFetch = true; return loader}
  }

  onPathChange = (event) =>{
    const path = event.currentTarget.id
    this.setState({path: path})
  }
 
  
  render() {
    const display = this.getCurrentDisplay(); // conditionally render display acc this.
   
    return (
      <div name='CatalogContainer' className=''> 
        <CatalogHeader onBrowseByClick = {this.onPathChange}/>
        {display}
      </div> 
    );
  }
}
 export default App;