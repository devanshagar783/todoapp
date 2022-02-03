import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux/store'
import LoginPage from './routes/LoginPage'
import NotFound from './routes/NotFound'
import HomePage from './routes/HomePage'
import TodoTask from './routes/TodoTask'

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Routes>
				<Route path="/todoapp/" element={<HomePage />} />
				<Route path="/todoapp/login" element={<LoginPage />} />
				<Route path="/todoapp/create-todo-task" element={<TodoTask />} />
				<Route path="/todoapp/update-task/:id" element={<TodoTask />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);