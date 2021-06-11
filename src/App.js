import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage'
import TypeTracerApp from './TypeTracerApp/TypeTracerApp'
import NavBar from './NavBar/NavBar.js'
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
      <LandingPage/>
      {/* <TypeTracerApp/> */}
      </> 
    );
  }
}
 export default App;