import React, { Component } from "react";
import "../todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

//will receive list of lists as props

class ToDolistLeft extends Component {
	render() {
		console.log("rendered todoLeft component");
		return (
			<div id="todo-list-left">
				<div id="expand-left-button">
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
}

export default ToDolistLeft;
