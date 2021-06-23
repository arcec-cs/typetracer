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

  onRouteChange = (route) => {console.log('click');this.setState({route: route})}

  render() {
    let page;
    switch (this.state.route) {
      case 'landingPage':
        page = <LandingPage routeChange={this.onRouteChange}/>;
        break;
      case 'signin':
        page = <RegisterSignIn routeChange={this.onRouteChange} registerOrSignIn={this.onRegisterOrSignIn}/>;
        break;
      case 'catalog':
        page = <Catalog routeChange={this.onRouteChange}/>;
        break;
      case 'myTexts':
        page = <MyTexts routeChange={this.onRouteChange}/>;
        break;
      case 'typeTracerApp':
        page = <TypeTracerApp routeChange={this.onRouteChange}/>;
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