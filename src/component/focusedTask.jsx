import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "../todo.css";

class FocusedTask extends Component {
	render() {
		console.log(this.props.task);
		const { task } = this.props;
		return (
			<div
				className={
					task === "hidden" ? "focused-task hidden" : "focused-task display"
				}
			>
				<div className={task.status === "" ? "task" : "task completed"}>
					<span className="checkbox" onClick={this.props.onTaskComplete} />
					<span className="task-name">{task.name}</span>
					<span className="flag-important" onClick={this.props.onTaskFlag}>
						<FontAwesomeIcon icon={task.flag === "" ? farStar : faStar} />
					</span>
				</div>
			</div>
		);
	}
}

export default FocusedTask;
