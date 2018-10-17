//main
import React, { Component } from "react";
import ToDoListLeft from "./todoListLeft";
import ExpandedList from "./expandedList";
import "../todo.css";
import {
	faHome,
	faSun,
	faStar,
	faCalendar,
	faListAlt
} from "@fortawesome/free-solid-svg-icons";

//change the state to contain list objects instead of list components

class ToDo extends Component {
	state = {
		toDoList: [],
		selected: ""
	};

	constructor(props) {
		super(props);

		this.dummyTaskArray = [
			[
				{ name: "Do Laundry", status: "" },
				{ name: "Get milk, eggs, and cheese", status: "" },
				{ name: "Visit IKEA", status: "" }
			],
			[
				{ name: "Clean mattress", status: "" },
				{ name: "Buy screen protector", status: "" },
				{ name: "Buy goldfish", status: "" },
				{ name: "Buy mom's birthday present", status: "" },
				{ name: "Get cheap wine", status: "" }
			],
			[
				{ name: "Meetup with Martin", status: "" },
				{ name: "Visit Popular @ Nex", status: "" }
			]
		];
		this.state.toDoList = [
			{ name: "My Day", tasks: this.dummyTaskArray[0], icon: faSun },
			{ name: "Important", tasks: this.dummyTaskArray[1], icon: faStar },
			{ name: "Planned", tasks: this.dummyTaskArray[2], icon: faCalendar },
			{ name: "Tasks", tasks: this.dummyTaskArray[0], icon: faHome }
		];
		//initialize the currently selected one to my day
		this.state.selected = this.state.toDoList[0];
	}
	render() {
		console.log("State of your todo list: ", this.state.toDoList);
		return (
			<div id="main-todo" className="container-fluid">
				<ToDoListLeft
					lists={this.state.toDoList}
					onNewList={this.handleNewList}
					onListClick={this.handleListClick}
				/>
				<ExpandedList
					currentlySelected={this.state.selected}
					onAddTask={this.handleAddTask}
					onListNameChange={this.handleListNameChange}
					onTaskComplete={this.handleTaskCompletion}
				/>
			</div>
		);
	}

	handleListClick = clickedList => {
		this.setState({
			selected: this.state.toDoList.find(list => list === clickedList)
		});
	};

	handleNewList = () => {
		const newList = [].concat(this.state.toDoList, {
			name: "Untitled",
			tasks: [],
			icon: faListAlt
		});
		this.setState({ toDoList: newList });
	};

	handleListNameChange = newName => {
		let newList = this.state.toDoList.slice(0);
		newList[newList.findIndex(list => list === this.state.selected)] = newName;

		console.log(newList, " new name ", newName);
		this.setState({ toDoList: newList, selected: newName });
	};

	handleAddTask = (e, updatedListWithTasks, selectedList) => {
		e.preventDefault();
		if (updatedListWithTasks !== "no input") {
			let newList = this.state.toDoList.slice(0);
			newList[
				newList.findIndex(list => list === this.state.selected)
			] = updatedListWithTasks;

			this.setState({ toDoList: newList, selected: updatedListWithTasks });
		} else {
			alert("Please enter a task");
		}
	};

	handleTaskCompletion = updatedTasks => {
		let newListSelected = this.state.selected;
		let newTodoList = this.state.toDoList.slice();

		newListSelected.tasks = updatedTasks;
		newTodoList[
			this.state.toDoList.indexOf(list => list === this.state.selected)
		] = this.newListSelected;

		this.setState({ toDoList: newTodoList, selected: newListSelected });
	};
}

export default ToDo;
