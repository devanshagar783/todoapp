import React, { useEffect } from 'react'
import { connect, useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addTodoFromLocal } from "./LoginActions";
import './HomePage.css'
import editIcon from '../icons/edit.png'
import deleteIcon from '../icons/delete.png'

function HomePage(props) {

	const navigate = useNavigate()
	const store = useStore()

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate('/login')
		}
	}, [])

	const checkLogin = () => {
	}

	const createTODO = () => {
		navigate('/create-todo-task')
	}

	function taskCard(task, index) {
		const date = task.date
		var color = ''
		if (date == tdate())
			color = "yellow"
		if (date < tdate())
			color = "red"
		if (date > tdate())
			color = "none"
		return (
			<li key={index} className={color === "yellow" ? 'task-card yellow' : color === "red" ? 'task-card red' : 'task-card'}>
				<p>{task.title}</p>
				<p>{task.date}</p>
				<p>{task.priority}</p>
				<div>
					<img className='edit-icon' src={editIcon} />
					<img className='delete-icon' src={deleteIcon} />
				</div>
			</li>
		)
	}

	const tdate = () => {
		let today, date, month, year
		today = new Date()
		date = today.getDate()
		month = today.getMonth() + 1
		if (date < 10)
			date = "0" + date
		if (month < 10)
			month = "0" + month
		year = today.getFullYear()
		let dt = year + "-" + month + "-" + date
		return dt
	}

	function fetchTodo() {
		var localTo = JSON.parse(localStorage.getItem("todos"))
		if (localTo) {
			var lis = []
			lis.push(localTo)
			if (lis.length > store.getState().todos.length)
				props.addTodoFromLocal(lis)
			else
				localStorage.setItem("todos", JSON.stringify(todos))
		}
		var todos = store.getState().todos
		localStorage.setItem("todos", JSON.stringify(todos))
		if (todos.length > 0) {
			var listOfTodo = todos.map((todo, index) => taskCard(todo, index))
			return (<ul>{listOfTodo}</ul>)
		}
		else {
			return <h2>No Tasks...</h2>
		}
	}

	checkLogin()
	return (
		<div>
			<header>
				<nav className='nav-header'>
					<h4>Todo App</h4>
					<button className='create-todo' onClick={createTODO}>+ Create new TODO</button>
					<button className='logout'>Logout</button>
				</nav>
			</header>
			<div className='tasks-list'>
				{fetchTodo()}
			</div>
		</div>
	)
}

export default connect(null, { addTodoFromLocal })(HomePage)