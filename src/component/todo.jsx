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

//next will be working on marking task as important (star icon)
//task objects with more data (add to my day, add due date, and note)
//the above will be displayed in a new component called FocusedTask

class ToDo extends Component {
	state = {
		toDoList: [],
		selected: ""
	};

	constructor(props) {
		super(props);

		this.dummyTaskArray = [
			[
				{ name: "Do Laundry", status: "", dueDate: "", note: "", flag: "" },
				{
					name: "Get milk, eggs, and cheese",
					status: "",
					dueDate: "",
					note: "",
					flag: ""
				},
				{ name: "Visit IKEA", status: "", dueDate: "", note: "", flag: "" }
			],
			[
				{ name: "Clean mattress", status: "", dueDate: "", note: "", flag: "" },
				{
					name: "Buy screen protector",
					status: "",
					dueDate: "",
					note: "",
					flag: ""
				},
				{ name: "Buy goldfish", status: "", dueDate: "", note: "", flag: "" },
				{
					name: "Buy mom's birthday present",
					status: "",
					dueDate: "",
					note: "",
					flag: ""
				},
				{ name: "Get cheap wine", status: "", dueDate: "", note: "", flag: "" }
			],
			[
				{ name: "Meetup with Martin", status: "", dueDate: "", note: "", flag: "" },
				{ name: "Visit Popular @ Nex", status: "", dueDate: "", note: "", flag: "" }
			],
			[
				{
					name: "Clean mattress",
					status: "",
					dueDate: "",
					note: "",
					flag: "important"
				},
				{
					name: "Buy screen protector",
					status: "",
					dueDate: "",
					note: "",
					flag: "important"
				},
				{
					name: "Buy goldfish",
					status: "",
					dueDate: "",
					note: "",
					flag: "important"
				},
				{
					name: "Clean bedroom",
					status: "",
					dueDate: "",
					note: "",
					flag: "important"
				},
				{
					name: "Practice ReactJS",
					status: "",
					dueDate: "",
					note: "",
					flag: "important"
				}
			]
		];
		this.state.toDoList = [
			{ name: "My Day", tasks: this.dummyTaskArray[0], icon: faSun },
			{ name: "Important", tasks: this.dummyTaskArray[3], icon: faStar },
			{ name: "Planned", tasks: this.dummyTaskArray[2], icon: faCalendar },
			{ name: "Tasks", tasks: this.dummyTaskArray[1], icon: faHome }
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
					onTaskUpdate={this.handleTaskUpdate}
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

	handleTaskUpdate = updatedTasks => {
		let newListSelected = this.state.selected;
		let newTodoList = this.state.toDoList.slice();

		//update the currently selected list's tasks to the newly updated tasks and pass the updatedList
		//in the newTodoList
		newListSelected.tasks = updatedTasks.newTasks;
		newTodoList[
			this.state.toDoList.indexOf(list => list === this.state.selected)
		] = newListSelected;

		//copy important list to a new variable
		let importantList =
			newTodoList[newTodoList.findIndex(list => list.name === "Important")];
		if (updatedTasks.action) {
			switch (updatedTasks.action) {
				case "important":
					//if user flags an item as important, add the task to the important list
					importantList.tasks = importantList.tasks.concat(updatedTasks.task);
					newTodoList[
						newTodoList.indexOf(list => list.name === "Important")
					] = importantList;
					console.log("new Todo after flag: ", newTodoList);
					break;
				case "remove-important":
					//if user unflags an item, check if items exist on
					break;
				default:
					break;
			}
		}

		//finally update the state with the updated lists
		this.setState({ toDoList: newTodoList, selected: newListSelected });
	};
}

export default ToDo;
