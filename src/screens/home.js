import React from "react";
import '../styles/main.css';

const axios = require('axios');
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      newTodoName: '',
      newTodoCompleted: undefined
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
        console.log(data);
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
        this.getAllToDo();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
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
          <input type="submit" onClick={this.addTodo} class="submit-btn" value="Add To Do " />

        </form>

	    </div>
	    <div class="task-list">
        <h2>To do list ({this.state.todoList.length})</h2>
        <table>
          <tr>
            <th>NAME</th>
            <th>COMPLETED</th>
          </tr>
          {this.state.todoList.map(this.createTodoRow)}
        
        </table>
      </div>
    </div>);
  }
}
export default Home;
