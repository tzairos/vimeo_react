import React, { Component } from 'react';
import './App.css';
import ReactUploader from './ReactUploader';

class App extends Component {
  state = {users: []} 

  componentDidMount() {
 
  }

  render() {
    return (
        <React.Fragment>
    
      <ReactUploader/>
      </React.Fragment>
    );
  }
}

export default App;