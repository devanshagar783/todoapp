import React, { useEffect, useState } from 'react'
import { connect, useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addTodoFromLocal } from "./Actions";
import './HomePage.css'
import editIcon from '../icons/edit.png'
import deleteIcon from '../icons/delete.png'

function HomePage(props) {

	const navigate = useNavigate()
	const store = useStore()
	const [todoList, setTodoList] = useState([])
	const [checkList, setCheckList] = useState([])
	const [dummy, setDummy] = useState(false)

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate('/todoapp/login')
		}
		setTodoList(fetchData())
	}, [])

	useEffect(() => {
		let array = new Array(todoList.length).fill(false)
		setCheckList(array)
	}, [todoList.length])

	const createTODO = () => {
		navigate('/todoapp/create-todo-task')
	}

	const handleEdit = (index) => {
		navigate(`/todoapp/update-task/${index}`)
	}

	const handleDelete = (index) => {
		var list = store.getState().todos
		list.splice(index, 1)
		setTodoList(list)
		setDummy(!dummy)
		localStorage.setItem("todos", JSON.stringify(list))
	}

	function handleDeleteMul() {
		var rev = checkList.reverse()
		var list = store.getState().todos
		rev.forEach((value, index) => {
			if (value == true) {
				list.splice(rev.length - 1 - index, 1)
			}
		})
		setTodoList(list)
		setDummy(!dummy)
		localStorage.setItem("todos", JSON.stringify(list))
	}

	const clickedCheck = (index) => {
		var newList=checkList
		newList[index] = !newList[index]
		setCheckList(newList)
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
				<input type={'checkbox'} onChange={() => clickedCheck(index)} />
				<p>{task.title}</p>
				<p>{task.date}</p>
				<p>{task.priority}</p>
				<div>
					<img className='edit-icon' src={editIcon} onClick={() => handleEdit(index)} />
					<img className='delete-icon' src={deleteIcon} onClick={() => handleDelete(index)} />
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

	function fetchData() {
		var localTo = JSON.parse(localStorage.getItem("todos"))
		let todos = store.getState().todos
		if (localTo && localTo.length > 0) {
			var lis = []
			lis.push(localTo)
			if (lis.length > todos.length)
				props.addTodoFromLocal(lis)
			else
				localStorage.setItem("todos", JSON.stringify(todos))
		}
		return todos
	}

	function FetchTodo() {
		var todos = fetchData()
		localStorage.setItem("todos", JSON.stringify(todos))
		if (todoList.length > 0) {
			let listOfTodo = todoList.map((todo, index) => taskCard(todo, index))
			return (<ul>{listOfTodo}</ul>)
		}
		else {
			return <h2>No Tasks...</h2>
		}
	}

	function handleLogout() {
		localStorage.clear()
		props.todos.length = 0
		navigate('/todoapp/login')
	}

	return (
		<div>
			<header>
				<nav className='nav-header'>
					<h4>Todo App</h4>
					<button className='create-todo' onClick={createTODO}>+ Create new TODO</button>
					<div className='nav_buttons'>
						<button className={'delete_all hidden'}  onClick={handleDeleteMul}>Delete Selected</button>
						<button className='logout' onClick={handleLogout}>Logout</button>
					</div>
				</nav>
			</header>
			<div className='tasks-list'>
				<FetchTodo />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		todos: state.todos
	}
}

export default connect(mapStateToProps, { addTodoFromLocal })(HomePage)