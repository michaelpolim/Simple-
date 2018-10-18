import React from "react";
import "../todo.css";

const Task = ({ task, taskFocus, taskComplete }) => {
	console.log("in task.jsx, task: ", task);
	return (
		<div>
			<div
				className={task.status === "" ? "task" : "task completed"}
				key={task.name + this.props.currentlySelected.tasks.indexOf(task)}
			>
				<span
					className="checkbox"
					onClick={() => taskFocus(this.completeTask(task))}
				/>
				<span className="task-name" onClick={() => this.handleTaskFocus(task)}>
					{task.name}
				</span>
			</div>
		</div>
	);
};

const completeTask = task => {};

export default Task;
