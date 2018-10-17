import React, { Component } from "react";
import "../todo.css";

class FocusedTask extends Component {
	render() {
		return (
			<div
				className={
					this.props.task === "hidden"
						? "focused-task hidden"
						: "focused-task display"
				}
			>
				<h3>{this.props.task.name}</h3>
			</div>
		);
	}
}

export default FocusedTask;
