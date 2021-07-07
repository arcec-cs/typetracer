import React, {Component } from 'react';
import './Catalog.css'
import BucketList from './BucketList';
import TitleCardList from '../Shared/TitleCardList';
import CatalogHeader from './CatalogHeader'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ToTextModal from '../Shared/ToTextModal';

class Catalog extends Component {
  constructor(props) { 
    super(props);
    
    this.shouldFetch = false; //booklean that is true when resource needed is not in cache
    this.cache = {}; //store Api requests here, 
    this.listTitle = 'Texts'; //for TitleCardList 

    this.textSelected={ // store to display title on modal
      id: null,
      title: null
    };
    
    this.state = { // path is used for api request, isModalOpen used to render modal
      path: 'titles',
      isModalOpen:false,
      isError:false
    }
  }

  componentDidMount() {
    const path =  this.state.path; // fetch titles first currently fetching all, could paginate to be more scalable.
    if(!this.cache[path])this.fetchPathContent() 
  }  
  componentDidUpdate() { 
    if(this.shouldFetch === true) {
      this.shouldFetch = false; //starting fetch request, reset.
      this.fetchPathContent();
    }
  }

  fetchPathContent(){
    const path = this.state.path;
      fetch(`http://localhost:3005/catalog/${path}`)
      .then(res=> res.json())
      .then(data => {
        this.cache[path] = data; 
        this.setState({})//re-render with fetched data
      })//network failure, if statment so error message only thrown for current path bc async 
      .catch((e) => {if(path === this.state.path)this.setState({isError: true})}); 
  }

  getCurrentDisplay(){
    //check for error
    if(this.state.isError === true) return <h1 className='tc center'>{'oops, something went wrong :('}</h1>
    //for api calls
    const loader = <span className='tc center'><Loader type="ThreeDots" color="#000000" height={80} width={80} timeout={20000}/></span>;
    //conditionally render content of the Catalog page based of path state;  
    const path = this.state.path; 
    if(path.includes('/')) //for buckets i.e specific author or category
      if(this.cache[`${path}`]) return <TitleCardList onItemClick={this.onPathChange} onTitleClick={this.onTitleClick} titleInfoArr={this.cache[`${path}`]} type={path}/>;
      else {this.shouldFetch = true; return loader}
    else if(path === 'titles') 
      if(this.cache.titles) return <TitleCardList onItemClick={this.onPathChange} onTitleClick={this.onTitleClick} titleInfoArr={this.cache.titles}/>;//check this.cache for content
      else {this.shouldFetch = true; return loader}// if not fetch and indicate loading to user
    else if(path === 'authors')
      if (this.cache.authors) return <BucketList onItemClick={this.onPathChange} type='author' info={this.cache.authors}/>;
      else {this.shouldFetch = true; return loader}
    else if(this.cache.categories) return <BucketList onItemClick={this.onPathChange} type='category' info={this.cache.categories}/>;
      else {this.shouldFetch = true; return loader}
  }

  onPathChange = (event) =>{
    this.listTitle = event.currentTarget.innerHTML;
    const path = event.currentTarget.id;
    this.setState({path: path, isError: false});// set is error to false bc new request on reRender
  }

  onCloseModal = () => this.setState({isModalOpen: false});
  onTitleClick = (event) => {
    this.textSelected.title = event.currentTarget.title; //title of book
    this.textSelected.id = event.currentTarget.id; // WILL need to be utilized in routing
    this.setState({isModalOpen: true});
  }
  onToTextClick = () =>{
    this.props.routeChange('typeTracerApp');
    sessionStorage.ttTextSelected = JSON.stringify({id: this.textSelected.id, title: this.textSelected.title})
  }
  
  render() {
    const display = this.getCurrentDisplay(); // conditionally render display acc this.
    const display2 = this.state.path.includes('/') ? <span name='container' className={'mw8 center flex flex-wrap justify-between'}>{display}</span> : display; 
    console.log('iscontSTy', this.state.path.includes('/'))
    return (
      <div name='CatalogContainer' className='flex flex-column h-navOffset'> 
        <CatalogHeader onBrowseByClick = {this.onPathChange} selected={this.state.path}/>
        <div className='flex flex-wrap w-100 h-100 pr4-l' style={{overflowY: 'scroll'}}>
            {display2}
        </div>
        <ToTextModal 
        title={this.textSelected.title} 
        toTextClick={this.onToTextClick} 
        open={this.state.isModalOpen} 
        onClose={this.onCloseModal}
        />
      </div> 
    );
  }
}
 export default Catalog;