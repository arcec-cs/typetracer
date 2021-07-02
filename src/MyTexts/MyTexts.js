import React, {Component } from 'react';
import TitleCardList from '../Shared/TitleCardList';
import MyTextsHeader from './MyTextsHeader'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class MyTexts extends Component {
  constructor(props) { 
    super(props);
    
    this.myTextsList = null; //store texts list
 
    this.modalData={ // store to display title on modal
      id: null,
      title: null
    };
    
    this.state = { // path is used for api request, isModalOpen used to render modal
      myTexts: null,
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
    const loader = <span className='tc'><Loader type="ThreeDots" color="#000000" height={80} width={80} timeout={20000}/></span>;
    if(this.state.isError === true) return <h1 className='tc'>{'oops, something went wrong :('}</h1>
    if(this.state.myTexts) return <TitleCardList onTitleClick={this.onTitleClick} titleInfoArr={this.state.myTexts}/>;//check to see if contenten has loaded
      else return loader;
   }

  onCloseModal = () => this.setState({isModalOpen: false});
  onTitleClick = (event) => {
    this.modalData.title = event.currentTarget.title; //title of book
    this.modalData.id = event.currentTarget.id; // WILL need to be utilized in routing
    this.setState({isModalOpen: true});
  }
  render() {
    console.log(this.state.myTexts)
    const display = this.getCurrentDisplay()
    return (
      <div name='CatalogContainer'> 
        <MyTextsHeader name={this.ttUser.name} date={this.ttUser.createdAt.slice(0,10)}/>
        {display}
        <Modal open={this.state.isModalOpen} onClose={this.onCloseModal} center>
          <div className='tc pa3'>
            <h2>{'Start TypeTracing:'}</h2>
            <h3 className='mb5'>{this.modalData.title}</h3>
            <button 
            style={{outline: 'none'}} 
            className='f5 tc br-pill ph4 pv3 mb2 dib white bg-black bn pointer'
            onClick={() => {
              this.props.routeChange('typeTracerApp');
              //id so we know which text to fetch in ttApp
              sessionStorage.ttTextSelected = JSON.stringify({id: this.modalData.id, title: this.modalData.title})
            }}
            >
              {'To Typetracer App'}
            </button> {/*route to TypeTracerApplication page*/}
          </div>
       </Modal>
      </div> 
    );
  }
}
 export default MyTexts;