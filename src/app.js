import React, { Component } from "react";
import ToDo from "./component/todo";
import TopSearchBar from "./component/topSearchBar";

class App extends Component {
	state = {};
	render() {
		return (
			<div>
				<ToDo />
			</div>
		);
	}
}

export default App;

/*
  Component list:
  1. top search bar
  2. ToDo (main, state contains TodoList array, which contains List components
      List object contains array of tasks, task is an object
    state= {todoList:[
      {listA: [{taskA}, {taskB}]},
      {listB: [{taskA}, {taskB}, {taskC}]},
      {listC: [{taskA}, {taskB}, {taskC}, {taskD}]}]
    })

    2.1. todo lists list component (left, expandable)
    2.2. list full tasks component
    2.3. task component
*/
