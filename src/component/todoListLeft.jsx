import React, { Component } from "react";
import "../todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

//will receive list of lists as props

class ToDolistLeft extends Component {
	constructor() {
		super();

		this.expand = "expanded";
	}
	render() {
		console.log("expanded: ", this.expand);
		return (
			<div id="todo-list-left" className={this.expand}>
				<div id="expand-left-button" onClick={this.handleExpand}>
					<FontAwesomeIcon icon={faBars} />
				</div>
				<div>
					{this.props.lists.map(list => {
						return (
							<div
								key={list.name + this.props.lists.indexOf(list)}
								className="left-list-name"
								onClick={() => this.props.onListClick(list)}
							>
								<FontAwesomeIcon icon={list.icon} className="icons" />{" "}
								<span className="icon-name">{list.name}</span>
								<span className="total-tasks">
									{list.tasks.filter(task => task.status !== "completed").length}
								</span>
							</div>
						);
					})}
				</div>
				<div
					id="new-list"
					className="left-list-name"
					onClick={this.props.onNewList}
				>
					<FontAwesomeIcon icon={faPlus} className="icons" />{" "}
					<span className="icon-name">New List</span>
				</div>
			</div>
		);
	}

	handleExpand = () => {
		if (this.expand === "expanded") {
			this.expand = "not-expanded";
		} else {
			this.expand = "expanded";
		}
		this.forceUpdate();
	};
}

export default ToDolistLeft;
