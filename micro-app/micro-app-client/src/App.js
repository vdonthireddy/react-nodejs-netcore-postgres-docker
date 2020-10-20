import React, { Component } from 'react';
import './App.css';
import ToDoItem from './ToDoItem';
import NewToDoItem from './NewToDoItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { item: [] };
    this.getItems();
  }

  async getItems() {
    console.log('api url:', process.env.REACT_APP_.API_URL_PREFIX + 'item');
    const response = await fetch(process.env.REACT_APP_.API_URL_PREFIX + 'item');
    const data = await response.json();
    this.setState({ item: data});
    console.log('Step 3: getItems in App.js');
  }

  itemRefreshed = () => {
    console.log('Step 2: itemRefreshed in App.js');
    this.getItems();
    console.log('App.js itemRefreshed');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body className="App-body">
          <NewToDoItem onItemsAdded={this.itemRefreshed.bind(this)} />
          <ToDoItem onItemsDeleted={this.itemRefreshed.bind(this)} item={this.state.item} />
        </body>
      </div>
    );
  }
}

export default App;