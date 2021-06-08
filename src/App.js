import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage'
import TypeTracerApp from './TypeTracerApp/TypeTracerApp'
class App extends Component {
  constructor() { 
    super();
    this.state = { 
    }
  }
  render() {
    return (
      <> 
      {/* <LandingPage/> */}
      <TypeTracerApp/>
      </> 
    );
  }
}
 export default App;