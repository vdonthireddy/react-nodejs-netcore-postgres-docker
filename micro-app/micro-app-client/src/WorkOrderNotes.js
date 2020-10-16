import React, { Component } from 'react';
 
class WorkorderNotes extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { notes } = this.props;
    console.log('Step 4: notes in WorkOrderNotes.js', notes);
    return (
      <div>
        <h1>Workorder Notes:</h1>
        <ul>
          {notes.map(note =>
            <li key={note.id}>
              {note.id}:{note.notes_desc}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default WorkorderNotes;
