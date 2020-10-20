import React, { Component } from 'react';
import './App.css';
import WorkorderNotes from './WorkOrderNotes';
import NewWorkOrderNotes from './NewWorkOrderNotes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };
    this.getNotes();
  }

  async getNotes() {
    console.log('api url:', process.env.REACT_APP_.API_URL_PREFIX + 'notes');
    const response = await fetch(process.env.REACT_APP_.API_URL_PREFIX + 'notes');
    const data = await response.json();
    this.setState({ notes: data});
    console.log('Step 3: getNotes in App.js');
  }

  notesRefreshed = () => {
    console.log('Step 2: notesRefreshed in App.js');
    this.getNotes();
    console.log('App.js notesRefreshed');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body className="App-body">
          <NewWorkOrderNotes onNotesAdded={this.notesRefreshed.bind(this)} />
          <WorkorderNotes onNotesDeleted={this.notesRefreshed.bind(this)} notes={this.state.notes} />
        </body>
      </div>
    );
  }
}

export default App;