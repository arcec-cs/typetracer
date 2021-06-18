import React, {Component } from 'react';
import titleEntries from './temp/titles.json'
// import authors from './temp/authors.json'
import BucketList from './BucketList';
import TitleCardList from './TitleCardList';
import CatalogHeader from './CatalogHeader'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class App extends Component {
  constructor(props) { 
    super(props);
    
    this.shouldFetch = false;
    this.cache = { }
    this.listTitle = 'Texts';

    this.modalData={
      id: null,
      title: null
    }
    
    this.state = { 
      path: 'titles',
      isModalOpen:false
    }
  }

  componentDidMount() {
    const path =  this.state.path;
    if(!this.cache[path])this.fetchPathContent() 
  }  
  componentDidUpdate() { 
    if(this.shouldFetch === true){ this.fetchPathContent();}
  }

  fetchPathContent(){
    const path = this.state.path;
      fetch(`http://localhost:3005/catalog/${path}`)
      .then(res=> res.json())
      .then(data => this.cache[path] = JSON.stringify(data))
      .then(a => console.log(`Fetching: ${this.cache[path]}`))
      .then(a => this.shouldFetch = false)
      .then(a => this.setState({})) //re-render with fetched data
      .catch(error => console.log(error))
  }

  getCurrentDisplay(){
    //for api calls
    const loader = <span className='tc'><Loader type="ThreeDots" color="#000000" height={80} width={80} timeout={20000}/></span>;
    
    //conditionally render content of the Catalog page based of path state;  
    const path = this.state.path; 
    if(path.includes('/')) 
      if(this.cache[`${path}`]) return <TitleCardList onItemClick={this.onPathChange} onTitleClick={this.onTitleClick}titleInfoArr={JSON.parse(this.cache[`${path}`])}/>;
      else {this.shouldFetch = true; return loader}
    else if(path === 'titles') 
      if(this.cache.titles) return <TitleCardList onItemClick={this.onPathChange} onTitleClick={this.onTitleClick} titleInfoArr={JSON.parse(this.cache.titles)}/>;//check this.cache for content
      else {this.shouldFetch = true; return loader}// if not fetch and indicate loading to user
    else if(path == 'authors')
      if (this.cache.authors) return <BucketList onItemClick={this.onPathChange} type='author' info={JSON.parse(this.cache.authors)}/>;
      else {this.shouldFetch = true; return loader}
    else if(this.cache.categories) return <BucketList onItemClick={this.onPathChange} type='category' info={JSON.parse(this.cache.categories)}/>;
      else {this.shouldFetch = true; return loader}
  }

  onPathChange = (event) =>{
    this.listTitle = event.currentTarget.innerHTML
    const path = event.currentTarget.id
    this.setState({path: path})
  }

  onCloseModal = () => this.setState({isModalOpen: false});
  onTitleClick = (event) => {
    this.modalData.title = event.currentTarget.title;
    this.modalData.id = event.currentTarget.id;
    this.setState({isModalOpen: true});
  }
  render() {
    const display = this.getCurrentDisplay(); // conditionally render display acc this.
    const isTitleCardList = (this.state.path !== 'authors') && (this.state.path !=='categories');
    return (
      <div name='CatalogContainer'> 
        <CatalogHeader onBrowseByClick = {this.onPathChange}/>
        {isTitleCardList && <h1 className="f3 f2-l bold center mw5 mw6-l mt0">{this.listTitle}:</h1> }
        {display}
        <Modal open={this.state.isModalOpen} onClose={this.onCloseModal} center>
        <div className='tc pa3'>
          <h2>{'Start TypeTracing:'}</h2>
          <h3 className='mb5 grow'>{this.modalData.title}</h3>
          <button className='f5 tc grow no-underline br-pill ph4 pv3 mb2 dib white bg-black bn pointer hover-bg-gray'>Button Text</button> {/*route to TypeTracerApplication page*/}
        </div>
       </Modal>
      </div> 
    );
  }
}
 export default App;