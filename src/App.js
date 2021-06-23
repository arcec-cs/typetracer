import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage'
import TypeTracerApp from './TypeTracerApp/TypeTracerApp'
import NavBar from './NavBar/NavBar.js'
import Catalog from './Catalog/Catalog'
import MyTexts from './MyTexts/MyTexts'
import RegisterSignIn from './RegisterSignIn/RegisterSignIn'
class App extends Component {
  constructor() { 
    super();
    this.state = { 
      isSignedIn: false,
      route:'landingPage'
    }
  }

  onRegisterOrSignIn = () => this.setState({isSignedIn: true})

  onRouteChange = (route) => {this.setState({})}

  render() {
    let page;
    switch (this.state.route) {
      case 'landingPage':
        page = <LandingPage/>;
        break;
      case 'catalog':
        page = <RegisterSignIn registerOrSignIn={this.onRegisterOrSignIn}/>;
        break;
      case 'catalog':
        page = <Catalog/>;
        break;
      case 'myTexts':
        page = <MyTexts/>;
        break;
      case 'typeTracerApp':
        page = <TypeTracerApp/>;
        break;
    }

    return (
      <> 
        <NavBar/>
        {page}
      </> 
    );
  }
}
 export default App;