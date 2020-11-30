import React from "react";
import '../styles/main.css';

const axios = require('axios');
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      newTodoName: '',
      newTodoCompleted: undefined,
      editId: undefined
    };
    
    // this.getAllTodo.bind(this.state);
    this.getAllToDo();
  }
  

  getAllToDo = () => {
    axios
      .get('http://localhost:3001/todo')
      .then((response) => {
        // handle success
        let data = response.data;
        // console.log(data);
        //STORE DATA INSIDE STATE VARIABLE
        this.setState({ todoList: data.todos });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  createTodoRow = (todo) => {
    return (
    <tr>
      <td>{todo.name}</td>
      <td>{todo.completed === true ? 'completed' : 'pending'}</td>
      <td>
        <a href="#" className="edit-link" onClick={(e) => this.setTodoEditable(e, todo.id, todo.name, todo.completed)}> Edit </a>
         / <a href="#" className="delete-link" onClick={(e) => this.deleteTodo(e, todo.id)}> Delete </a>
      </td>
    </tr>
    )
  }

  addTodo = (e) => {
    e.preventDefault();
    let todoName = this.state.newTodoName;
    let todoCompleted = this.state.newTodoCompleted;

    let data = {
      name: todoName,
      completed: todoCompleted
    };

    axios
      .post('http://localhost:3001/todo', data)
      .then((response) => {
        // handle success
        // this.getAllToDo();
        this.setState({ todoList: response.data.todos });

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  setTodoEditable = (e, id, name, completed) => {
    e.preventDefault();
    this.setState({
      editId: id,
      newTodoName: name,
      newTodoCompleted: completed
    });
  }

  editTodo = (e) => {
    e.preventDefault();
    let todoId = this.state.editId;
    let todoName = this.state.newTodoName;
    let todoCompleted = this.state.newTodoCompleted;

    let data = {
      id: todoId,
      name: todoName,
      completed: todoCompleted
    };

    axios
      .put('http://localhost:3001/todo', data)
      .then((response) => {
        // handle success
        this.cancelEdit();
        // this.getAllToDo();
        this.setState({ todoList: response.data.todos });

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  deleteTodo = (e, id) => {
    e.preventDefault();

    let deleteTodoId = id;
   
    let dataDel = {
      id: deleteTodoId
    };
      axios
        .delete('http://localhost:3001/todo', {data: dataDel})
        .then((response) => {
          // handle success
          console.log(response.data.todos);
          this.cancelEdit();
          // this.getAllToDo();
          this.setState({ todoList: response.data.todos });
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      
  }

  cancelEdit = () => {
    this.setState({
      editId: undefined,
      newTodoName: '',
      newTodoCompleted: false
    });
  }

  render() {
    if(this.state.todoList.length <= 0) {
      return 'is loading'
    }

    return(
    <div>
      <div class="task-form">
		    <h1>To Do Application</h1>

        <form action="" method="POST">
          <label for="taskname">Task Name</label><br/>
          <input type="text" id="taskname" name="taskname" 
          placeholder="Add Task"
          value={this.state.newTodoName}
          onChange={(e) => this.setState({newTodoName: e.target.value})}
          />
          <br/>
          <label for="status">Status</label> <br/>
          <select name="status" id="status"
          value={this.state.newTodoCompleted === true ? 'yes' : 'no'}
          onChange={(e) => this.setState({newTodoCompleted: e.target.value === 'yes' ? true : false})}
          >
            <option value="yes">YES</option>
            <option value="no">NO</option>
          </select>
          <br/>
            {this.state.editId === undefined && (
              <button type="submit" onClick={this.addTodo} class="submit-btn" >
                Add
              </button>
            )}

            {this.state.editId !== undefined && (
              <button type="submit" onClick={this.editTodo} class="edit-btn" >
                Edit
              </button>
            )}
          
            {this.state.editId !== undefined && (
              <button type="submit" onClick={this.cancelEdit} class="cancel-btn" >
                Cancel
              </button>
            )}

        </form>

	    </div>
	    <div class="task-list">
        <h2>To do list ({this.state.todoList.length})</h2>
        <table>
          <tr>
            <th>NAME</th>
            <th>COMPLETED</th>
            <th>ACTION</th>
          </tr>
          {this.state.todoList.map(this.createTodoRow)}
        
        </table>
      </div>
    </div>);
  }
}
export default Home;
