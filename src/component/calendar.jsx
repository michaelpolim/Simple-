import React, { Component } from "react";
import "../calendar.css";
import dateFns from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

//header component
//days component? (mon - sun ) is this necessary
//date component onClick select date

class Calendar extends Component {
	state = {
		currentMonth: new Date(),
		selectedDate: new Date()
	};
	render() {
		return (
			<div id={this.props.display}>
				<h3>{this.renderHeader()}</h3>
				{this.renderDays()}
				{this.renderCells()}
				{this.renderConfirmCancel()}
			</div>
		);
	}

	renderHeader() {
		const dateFormat = "MMMM YYYY";
		return (
			<div id="header">
				<span className="icon" onClick={this.onPrevMonth}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</span>
				<span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
				<span className="icon" onClick={this.onNextMonth}>
					<FontAwesomeIcon icon={faArrowRight} />
				</span>
			</div>
		);
	}

	renderDays() {
		const dateFormat = "ddd";
		const days = [];

		let startDate = dateFns.startOfWeek(this.state.currentMonth);

		for (let i = 0; i < 7; i++) {
			days.push(
				<div className="day">{dateFns.format(startDate, dateFormat)}</div>
			);
			startDate = dateFns.addDays(startDate, i);
		}
		return <div id="days-row">{days}</div>;
	}

	renderCells() {
		const dateFormat = "D";
		const dateComparisonFormat = "D MMM YYYY";
		const { currentMonth, selectedDate } = this.state;
		const monthStart = dateFns.startOfMonth(currentMonth);
		const monthEnd = dateFns.endOfMonth(currentMonth);
		let startDate = dateFns.startOfWeek(monthStart);
		const endDate = dateFns.endOfWeek(monthEnd);
		let rows = [];
		let week = [];
		let counter = 0;

		while (startDate < endDate) {
			for (counter = 0; counter < 7; counter++) {
				let d = startDate;
				if (
					dateFns.format(d, dateComparisonFormat) ===
					dateFns.format(selectedDate, dateComparisonFormat)
				) {
					week.push(
						<span className="cell-selected">
							<span>{dateFns.format(startDate, dateFormat)}</span>
						</span>
					);
				} else {
					week.push(
						<span
							className={
								dateFns.compareAsc(startDate, monthStart) === -1 ||
								dateFns.compareAsc(startDate, monthEnd) === 1
									? "cell-out-of-bound"
									: "cell"
							}
							onClick={() => this.onCellClick(d)}
						>
							{dateFns.format(startDate, dateFormat)}
						</span>
					);
				}
				startDate = dateFns.addDays(startDate, 1);
			}
			rows.push(<div className="cell-row">{[...week]}</div>);
			week = [];
		}
		return <div id="cells">{rows}</div>;
	}

	renderConfirmCancel() {
		return (
			<div id="confirm-cancel">
				<span className="button" onClick={this.props.onCancel}>
					Cancel
				</span>
				<span
					className="button"
					onClick={() => this.props.onDueDateConfirm(this.state.selectedDate)}
				>
					Confirm
				</span>
			</div>
		);
	}

	onCellClick = day => {
		this.setState({ selectedDate: day });
		console.log("SelectedDate: ", this.state.selectedDate);
	};

	onNextMonth = () => {
		this.setState({
			currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
		});
	};

	onPrevMonth = () => {
		this.setState({
			currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
		});
	};
}

export default Calendar;
