import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../todo.css";
class ExpandedList extends Component {
	state = {
		taskName: "",
		listName: ""
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
									onClick={this.handleShowTask}
								>
									<input type="checkbox" name="completed" />
									<span
										className="checkbox"
										onClick={() => this.props.onTaskComplete(this.completeTask(task))}
									/>
									<span className="task-name">{task.name}</span>
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
		);
	}

	handleInput = e => {
		this.setState({ taskName: e.target.value });
	};

	handleShowTask = () => {
		console.log("task clicked");
	};

	completeTask = task => {
		console.log("task completed: ", task);
		//if current task status is incomplete, make it complete and vice versa
		//return the tasks array
		let newTasks = this.props.currentlySelected.tasks.slice();

		switch (task.status) {
			case "":
				newTasks.splice(this.props.currentlySelected.tasks.indexOf(task), 1, {
					name: task.name,
					status: "completed"
				});
				return newTasks;
			case "completed":
				newTasks.splice(this.props.currentlySelected.tasks.indexOf(task), 1, {
					name: task.name,
					status: ""
				});
				return newTasks;
			default:
				break;
		}
	};

	newTask = () => {
		if (this.state.taskName) {
			let newTasks = [].concat(this.props.currentlySelected.tasks, {
				name: this.state.taskName,
				status: ""
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
