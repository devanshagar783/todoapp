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
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				
				<Route path="/create-todo-task" element={<TodoTask />} />
				<Route path="/update-task/:id" element={<TodoTask />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);