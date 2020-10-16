import React, { Component } from 'react';
import './App.css';
import WorkorderNotes from './WorkOrderNotes';
import NewWorkOrderNotes from './NewWorkOrderNotes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {notes: []};
    this.getNotes();
  }

  getNotes = ()=>{
    console.log('api url:', process.env.REACT_APP_.API_URL_PREFIX+'notes');
    fetch(process.env.REACT_APP_.API_URL_PREFIX+'notes')
      .then(response => response.json())
      .then(data => this.setState({ notes: data }));
      console.log('Step 3: getNotes in App.js');
  }

  notesAdded = () => {
    console.log('Step 2: notesAdded in App.js');
    this.getNotes();
    console.log('App.js notesAdded');
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <NewWorkOrderNotes onNotesAdded={this.notesAdded.bind(this)}/>
          <WorkorderNotes notes={this.state.notes}/>
        </header>
      </div>
    );
  }
}

export default App;
