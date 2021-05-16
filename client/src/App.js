import React, { Component } from 'react';
import './App.css';
import ReactUploader from './ReactUploader';

class App extends Component {
  state = {users: []} 

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
        <React.Fragment>
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
      <ReactUploader/>
      </React.Fragment>
    );
  }
}

export default App;