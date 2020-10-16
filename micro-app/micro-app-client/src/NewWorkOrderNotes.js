import React, { Component } from 'react';

class NewWorkorderNotes extends Component {

  constructor(props){
    super(props);
    this.addNewNotes=this.addNewNotes.bind(this);
  }
  
  addNewNotes = (e)=>{
    const self = this;
    e.preventDefault();
    console.log('Step 1: addNewNotes in NewWorkOrderNotes.js');
    
    fetch(process.env.REACT_APP_.API_URL_PREFIX+'notes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          notes: {
              desc: document.getElementById('notes_desc').value
          }
      })
    })
    .then(response=>{
      self.props.onNotesAdded(document.getElementById('notes_desc').value);
      console.log('Step 5: this.props.onNotesAdded in NewWorkOrderNotes.js');
    });
  };

  render() {
    return (
      <div>
          <h1>New Workorder Notes:</h1>
          <form>
            <input type="text" id="notes_desc" />
            <button id="btnSubmit" onClick={this.addNewNotes}>Add Notes</button>
          </form>
      </div>
    );
  }
}

export default NewWorkorderNotes;
