import React, { Component } from 'react';

class NewToDoItem extends Component {

  constructor(props){
    super(props);
    this.addNewItem=this.addNewItem.bind(this);
  }

  componentDidMount() {
    var item_desc = document.getElementById('item_desc');
    if (item_desc != null) {
      item_desc.focus();
    }
  }
  
  addNewItem = (e)=>{
    const self = this;
    e.preventDefault();
    console.log('Step 1: addNewItem in NewToDoItem.js');
    
    fetch(process.env.REACT_APP_.API_URL_PREFIX+'item', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          item: {
              desc: document.getElementById('item_desc').value
          }
      })
    })
    .then(response=>{
      self.props.onItemsAdded(document.getElementById('item_desc').value);
      document.getElementById('item_desc').value = '';
      document.getElementById('item_desc').focus();
      console.log('Step 5: this.props.onItemsAdded in NewToDoItem.js');
    });
  };

  render() {
    return (
      <div>
          <h1>New ToDo Item:</h1>
          <form>
            <input type="text" id="item_desc" name="item_desc" />
            <button id="btnSubmit" onClick={this.addNewItem}>Add ToDoItem</button>
          </form>
      </div>
    );
  }
}

export default NewToDoItem;
