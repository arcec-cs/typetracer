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
      route:'landingPage',
      isMenuOpen: false,
      accessModal: false,
    }
  }

  onComponentWillMount() {
    if(!sessionStorage.ttUser) { //Handles keeping signed in state true upon reload
      const isAccessTokenValid = (JSON.parse(sessionStorage.ttuser).accessTokenInfo.expires > Math.floor(Date.now() / 1000));
      if (isAccessTokenValid) this.setState({isSignedIn: true});
    }
  }

  onRegisterOrSignIn = () => this.setState({isSignedIn: true});

  onRouteChange = (route) => this.setState({route: route}); //need to have session storage route for reloads

  onSignOut = () => {
    const ttUser = JSON.parse(sessionStorage.ttUser);//get from session storage
    clearTimeout(ttUser.accessTimers.accessEnd);
    clearTimeout(ttUser.accessTimers.accessWarning);
    this.setState({isSignedIn: false, route:'landingPage'}); 
    sessionStorage.removeItem('ttUser');
  }

  onMenuStateChange = (state) => this.setState({isMenuOpen: state.isOpen})//part of documentation 
  closeMenu = () => this.setState({isMenuOpen: false})
  

  render() {
    let page;
    switch (this.state.route) {
      case 'landingPage':
        page = <LandingPage routeChange={this.onRouteChange}/>;
        break;
      case 'signin':
        page = <RegisterSignIn routeChange={this.onRouteChange} registerOrSignIn={this.onRegisterOrSignIn} signOut={this.onSignOut}/>;
        break;
      case 'catalog':
        page = <Catalog signedIn={this.state.isSignedIn} routeChange={this.onRouteChange}/>;
        break;
      case 'myTexts':
        page = <MyTexts routeChange={this.onRouteChange}/>;
        break;
      case 'typeTracerApp':
        page = <TypeTracerApp routeChange={this.onRouteChange} onRegisterOrSignIn={this.onRegisterOrSignIn} onSignOut={this.onSignOut}/>;
        break;
      default:
        page = <LandingPage routeChange={this.onRouteChange}/>;
    }

    return (
      <> 
        <NavBar 
        routeChange={this.onRouteChange} 
        signedIn={this.state.isSignedIn} 
        signOut={this.onSignOut}
        menuIsOpen={this.state.isMenuOpen}
        menuStateChange={this.onMenuStateChange}
        closeMenu={this.closeMenu}
        />
        {page}
      </> 
    );
  }
}
 export default App;