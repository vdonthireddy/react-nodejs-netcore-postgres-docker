import React, { Component } from 'react';
 
class WorkorderNotes extends Component {
  constructor(props) {
    super(props);
    this.deleteNotes=this.deleteNotes.bind(this);
  }

   deleteNotes=(id)=>{
    const self = this;
    //e.preventDefault();
    console.log('Step 1: deleteNotes in WorkOrderNotes.js');
    var url = `${process.env.REACT_APP_.API_URL_PREFIX}notes/${id}`;
    console.log(url);
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
      // ,
      // body: JSON.stringify({
      //     notes: {
      //         id: noteid
      //     }
      // })
    })
    .then(response=>{
      self.props.onNotesDeleted();
      console.log('Step 5: this.props.onNotesAdded in NewWorkOrderNotes.js');
    });
  };

  render() {
    const { notes } = this.props;
    console.log('Step 4: notes in WorkOrderNotes.js', notes);
    return (
      <div>
        <h1>Workorder Notes:</h1>
        <table>
          {notes.map(note =>
            <tr key={note.id}>
              <td>{note.id}</td><td>{note.notes_desc}</td><td><a href='#' id='aDeleteNotes' onClick={()=>this.deleteNotes(note.id)}>delete</a></td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

export default WorkorderNotes;
