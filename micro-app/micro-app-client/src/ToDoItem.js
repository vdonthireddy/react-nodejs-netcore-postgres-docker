import React, { Component } from 'react';
 
class ToDoItem extends Component {
  constructor(props) {
    super(props);
    this.deleteItems=this.deleteItems.bind(this);
  }

   deleteItems=(id)=>{
    const self = this;
    //e.preventDefault();
    console.log('Step 1: deleteItems in ToDoItem.js');
    var url = `${process.env.REACT_APP_.API_URL_PREFIX}item/${id}`;
    console.log(url);
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
      // ,
      // body: JSON.stringify({
      //     item: {
      //         id: itemid
      //     }
      // })
    })
    .then(response=>{
      self.props.onItemsDeleted();
      console.log('Step 5: this.props.onItemsAdded in NewToDoItem.js');
    });
  };

  render() {
    const { item } = this.props;
    console.log('Step 4: item in ToDoItem.js', item);
    return (
      <div>
        <h1>ToDo Items:</h1>
        <table>
          {item.map(item =>
            <tr key={item.id}>
              <td>{item.id}</td><td>{item.item_desc}</td><td><a href='#' id='aDeleteItems' onClick={()=>this.deleteItems(item.id)}>delete</a></td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

export default ToDoItem;
