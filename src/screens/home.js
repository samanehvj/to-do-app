import React from "react";
import '../styles/main.css';

const axios = require('axios');
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
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
  render() {
    if(this.state.todoList.length <= 0) {
      return 'is loading'
    }

    return(
    <div>
      <div class="task-form">
		    <h1>To Do Application</h1>

        <form action="/todo/" method="POST">
          <label for="taskname">Task Name</label><br/>
          <input type="text" id="taskname" name="taskname" /><br/>
          <label for="status">Status</label> <br/>
          <select name="status" id="status">
            <option value="yes">YES</option>
            <option value="no">NO</option>
          </select>
          <br/>
          <input type="submit" class="submit-btn" value="Add To Do " />

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
