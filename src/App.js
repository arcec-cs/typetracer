import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage'
import TypeTracerApp from './TypeTracerApp/TypeTracerApp'
import NavBar from './NavBar/NavBar.js'
import Catalog from './Catalog/Catalog'
class App extends Component {
  constructor() { 
    super();
    this.state = { 
    }
  }
  render() {
    return (
      <> 
      <NavBar/>
      {/* <LandingPage/> */}
      <Catalog/>
      {/* <TypeTracerApp/> */}
      </> 
    );
  }
}
 export default App;