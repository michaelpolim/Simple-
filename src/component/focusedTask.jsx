import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faArrowRight,
	faTrash
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "../todo.css";
import Calendar from "./calendar";

//bug where onClick is called whenever focusedTask component is rendered ?

class FocusedTask extends Component {
	state = {
		showCalendar: "main-calendar"
	};
	render() {
		const { task } = this.props;
		return (
			<div
				className={
					task === "hidden" ? "focused-task hidden" : "focused-task display"
				}
			>
				<div className={task.status === "" ? "box task" : "box task completed"}>
					<span className="checkbox" onClick={this.props.onTaskComplete} />
					<h4 className="task-name">{task.name}</h4>
					<span className="flag-important" onClick={this.props.onTaskFlag}>
						<FontAwesomeIcon icon={task.flag === "" ? farStar : faStar} />
					</span>
				</div>
				<div className="box">
					<span className="list">Add to My Day</span>
				</div>
				<div className="box tools">
					<span className="list">Remind Me</span>
					<span className="list" onClick={console.log("ADD DUE DATE")}>
						Add Due Date
					</span>
					<Calendar display={this.state.showCalendar} />
					<span className="list">Repeat</span>
				</div>
				<div className="box note">
					<textarea placeholder="Add a note" />
				</div>
				<div id="bottom-tools">
					<div className="tool" onClick={this.props.onHide}>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
					<div className="date-created">Created at 12:30 Friday 3 Oct 2019</div>
					<div className="tool" onClick={this.props.onTaskDelete}>
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</div>
			</div>
		);
	}

	displayCalendar = () => {
		if (this.state.showCalendar === "main-calendar") {
			this.setState({ showCalendar: "main-calendar show" });
		} else {
			this.setState({ showCalendar: "main-calendar" });
		}
	};
}

export default FocusedTask;
