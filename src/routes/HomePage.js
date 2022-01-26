import React, { Component, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'


// import React from 'react'

function HomePage() {
	const navigate= useNavigate()

	useEffect(() => {
		if(!localStorage.getItem("token")){
			navigate('/login')
			console.log("Inside check")
		}

	}, [])

	const checkLogin = () =>{
	}
	
	checkLogin()
  	return (
	<div>
		<h2>Hope page</h2>
	</div>
  )
}

export default HomePage