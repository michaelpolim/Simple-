import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar, faThList } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import FocusedTask from "./focusedTask";
import "../todo.css";
import Task from "./task";

class ExpandedList extends Component {
	state = {
		taskName: "",
		listName: "",
		focusedTask: "hidden"
	};

	constructor(props) {
		super(props);

		this.state.listName = this.props.currentlySelected.name;
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ listName: nextProps.currentlySelected.name });
	}
	render() {
		console.log(this.state.listName);
		return (
			<div id="focused-list-task">
				<div id="expanded-list">
					<div className="list">
						<input
							className="name"
							value={this.state.listName}
							onChange={e => this.props.onListNameChange(this.newName(e))}
						/>
						<div className="task-list">
							{this.props.currentlySelected.tasks.map(task => {
								return (
									<div
										className={task.status === "" ? "task" : "task completed"}
										key={task.name + this.props.currentlySelected.tasks.indexOf(task)}
									>
										<span
											className="checkbox"
											onClick={() => this.props.onTaskUpdate(this.completeTask(task))}
										/>
										<span
											className="task-name"
											onClick={() => this.handleTaskFocus(task)}
										>
											{task.name}
										</span>
										<span
											className="flag-important"
											onClick={() => this.props.onTaskUpdate(this.flagAsImpt(task))}
										>
											<FontAwesomeIcon icon={task.flag === "" ? farStar : faStar} />
										</span>
									</div>
								);
							})}
						</div>
					</div>
					<form className="add-task">
						<input
							type="text"
							placeholder="Add a task"
							onChange={e => this.handleInput(e)}
							value={this.state.taskName}
						/>
						<button
							type="submit"
							value=""
							id="add-task-button"
							onClick={e =>
								this.props.onAddTask(e, this.newTask(), this.props.currentlySelected)
							}
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</form>
				</div>
				<FocusedTask
					task={this.state.focusedTask}
					onTaskComplete={() =>
						this.props.onTaskUpdate(this.completeTask(this.state.focusedTask))
					}
					onTaskFlag={() =>
						this.props.onTaskUpdate(this.flagAsImpt(this.state.focusedTask))
					}
				/>
			</div>
		);
	}

	handleInput = e => {
		this.setState({ taskName: e.target.value });
	};

	//	component only setting focusedtask as task here, so once i setstate focusedtask in
	// complete task function, it's not the same object anymore and hence can't find the
	// new state.focusedtask inside this.props.currentlySelected.tasks
	handleTaskFocus = task => {
		if (task === this.state.focusedTask) {
			this.setState({ focusedTask: "hidden" });
		} else {
			this.setState({ focusedTask: task });
		}
	};

	completeTask = task => {
		let newTasks = this.props.currentlySelected.tasks.slice();
		console.log("task to be updated: ", task);
		switch (task.status) {
			case "":
				newTasks.splice(this.props.currentlySelected.tasks.indexOf(task), 1, {
					name: task.name,
					status: "completed",
					dueDate: task.dueDate,
					note: task.note,
					flag: task.flag
				});
				this.setState({
					focusedTask: {
						name: task.name,
						status: "completed",
						dueDate: task.dueDate,
						note: task.note,
						flag: task.flag
					}
				});
				console.log(
					"Completing task, your tasks: ",
					this.props.currentlySelected.tasks,
					task,
					this.props.currentlySelected.tasks.indexOf(task)
				);
				return { newTasks: newTasks, task: task, action: "completed" };
			case "completed":
				newTasks.splice(this.props.currentlySelected.tasks.indexOf(task), 1, {
					name: task.name,
					status: "",
					dueDate: task.dueDate,
					note: task.note,
					flag: task.flag
				});
				this.setState({
					focusedTask: {
						name: task.name,
						status: "",
						dueDate: task.dueDate,
						note: task.note,
						flag: task.flag
					}
				});
				console.log(
					"Undoing task completion, your tasks: ",
					this.props.currentlySelected.tasks,
					task,
					this.props.currentlySelected.tasks.indexOf(task)
				);
				return { newTasks: newTasks, task: task, action: "" };
			default:
				break;
		}
	};

	flagAsImpt = task => {
		let newTasks = this.props.currentlySelected.tasks.slice();
		switch (task.flag) {
			case "":
				newTasks.splice(this.props.currentlySelected.tasks.indexOf(task), 1, {
					name: task.name,
					status: task.status,
					dueDate: task.dueDate,
					note: task.note,
					flag: "important"
				});
				this.setState({
					focusedTask: {
						name: task.name,
						status: task.status,
						dueDate: task.dueDate,
						note: task.note,
						flag: "important"
					}
				});
				return { newTasks: newTasks, task: task, action: "important" };

			case "important":
				newTasks.splice(this.props.currentlySelected.tasks.indexOf(task), 1, {
					name: task.name,
					status: task.status,
					dueDate: task.dueDate,
					note: task.note,
					flag: ""
				});
				this.setState({
					focusedTask: {
						name: task.name,
						status: task.status,
						dueDate: task.dueDate,
						note: task.note,
						flag: ""
					}
				});
				return { newTasks: newTasks, task: task, action: "remove-important" };
			default:
				break;
		}
	};

	newTask = () => {
		if (this.state.taskName) {
			let newTasks = [].concat(this.props.currentlySelected.tasks, {
				name: this.state.taskName,
				status: "",
				dueDate: "",
				note: "",
				flag: ""
			});

			let newSelected = {
				name: this.props.currentlySelected.name,
				tasks: newTasks,
				icon: this.props.currentlySelected.icon
			};
			this.setState({ taskName: "" });
			return newSelected;
		} else {
			return "no input";
		}
	};

	newName = e => {
		return {
			name: e.target.value,
			tasks: this.props.currentlySelected.tasks,
			icon: this.props.currentlySelected.icon
		};
	};
}

export default ExpandedList;
