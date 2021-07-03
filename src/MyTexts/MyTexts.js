import React, {Component } from 'react';
import TitleCardList from '../Shared/TitleCardList';
import MyTextsHeader from './MyTextsHeader'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import NoTextsBanner from './NoTextsBanner'
import ToTextModal from '../Shared/ToTextModal';

class MyTexts extends Component {
  constructor(props) { 
    super(props);
    
    this.myTextsList = null; //store texts list
 
    this.textSelected={ // store to display title on modal
      id: null,
      title: null
    };
    
    this.state = { // path is used for api request, isModalOpen used to render modal
      myTexts: undefined,
      isModalOpen:false,
      isError:false // 
    }

    this.ttUser = sessionStorage.ttUser && JSON.parse(sessionStorage.ttUser)
  }

  componentDidMount() {
    this.fetchAndStoreMyTexts() // fetch titles first currently fetching all, could paginate to be more scalable. 
  }  

  fetchAndStoreMyTexts(){
    const userInfo = JSON.parse(sessionStorage.ttUser)
    const token = userInfo.accessTokenInfo.accessToken;
    const uId = userInfo.uId;
    fetch(`http://localhost:3005/myTexts/${uId}`, {headers:{'Authorization': `bearer ${token}`}})
    .then(res => res.json())
    .then(data => {this.setState({myTexts: data}); console.log(data)})
    //.then(data => this.setState({myTexts: data}))
    .catch(e => this.setState({isError: true})); //there was an error, reload page
  }

  getCurrentDisplay(){
    const loader = <span className='tc center'><Loader type="ThreeDots" color="#000000" height={80} width={80} timeout={20000}/></span>;
    if(this.state.isError === true) return <h1 className='tc'>{'oops, something went wrong :('}</h1>
    if(this.state.myTexts) return <TitleCardList onTitleClick={this.onTitleClick} titleInfoArr={this.state.myTexts}/>;//check to see if contenten has loaded
      else return loader;
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
    const display = this.getCurrentDisplay()
    return (
      <div name='CatalogContainer' className='flex flex-column h-navOffset'>
        <MyTextsHeader name={this.ttUser.name} date={this.ttUser.createdAt.slice(0,10)}/>
        {(Array.isArray(this.state.myTexts) && this.state.myTexts.length !== 0) ? 
        <div className='flex flex-wrap w-100 h-100 pr4-l' style={{overflowY: 'scroll'}}>
          <span name='container' className={'mw8 center flex flex-wrap justify-between'}>{display}</span> 
        </div>: 
          <NoTextsBanner routeChange={this.props.routeChange}/>
        }
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
 export default MyTexts;