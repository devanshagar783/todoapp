import React, { useEffect, useState } from 'react'
import { connect, useStore } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './TodoTask.css'

function TodoTask(props) {

	const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [dueDate, setDueDate] = useState(new Date())
	const [priority, setPriority] = useState('Medium')
	const task_index = useParams()
	const store = useStore()

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate('/todoapp/login')
		}
		else if (task_index.id) {
			const tod = store.getState().todos[task_index.id]
			setTitle(tod.title)
			setDescription(tod.des)
			setDueDate(tod.date)
			setPriority(tod.priority)
		}
	}, [])

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value)
	}

	const handleDueDateChange = (event) => {
		setDueDate(event.target.value)
	}

	const handlePriorityChange = (event) => {
		setPriority(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (task_index.id >= 0) {
			props.todos[task_index.id].title = title
			props.todos[task_index.id].des = description
			props.todos[task_index.id].date = dueDate
			props.todos[task_index.id].priority = priority
		}
		else {
			let todo = {
				title: title,
				des: description,
				date: dueDate,
				priority: priority
			}
			props.todos.push(todo)
		}
		navigate('/todoapp/')
	}

	const disablePastDates = () => {
		let today, date, month, year
		today = new Date()
		date = today.getDate()
		month = today.getMonth() + 1
		if (date < 10)
			date = "0" + date
		if (month < 10)
			month = "0" + month
		year = today.getFullYear()
		let dt = year + '-' + month + '-' + date
		return dt
	}

	function handleLogout() {
		localStorage.clear()
		props.todos.length = 0
		navigate('/todoapp/login')
	}

	return (
		<div className='todo-main-div'>
			<div className='logout-div' >
				<button className='logout-btn' onClick={handleLogout}>Logout</button>
			</div>
			<div className='task-details'>
				<h3>Enter Task Details</h3>
				<form onSubmit={handleSubmit}>
					<div className='input-area'>
						<label>Title</label><br />
						<input type='text' maxLength={20} value={title} onChange={handleTitleChange} readOnly={task_index.id ? true : false} required />
					</div>
					<div className='input-area'>
						<label>Description</label><br />
						<input type='text' maxLength={100} value={description} onChange={handleDescriptionChange} />
					</div>
					<div className='input-area'>
						<label>Due Date</label><br />
						<input type='date' value={dueDate} min={disablePastDates()} readOnly={task_index.id ? true : false} onChange={handleDueDateChange} required />
					</div>
					<div className='input-area'>
						<label>Priority</label><br />
						<select value={priority} onChange={handlePriorityChange} required>
							<option value='High'>High</option>
							<option value='Medium'>Medium</option>
							<option value='Low'>Low</option>
						</select>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		todos: state.todos
	}
}

export default connect(mapStateToProps)(TodoTask)