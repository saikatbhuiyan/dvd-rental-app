import React, { Component } from 'react';
import Movies from './component/movies';
import './App.css';


class App extends Component {

  render() { 
    return ( 
      <div className="container">
          <Movies />
      </div>
     );
  }
}
 
export default App;
