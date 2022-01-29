import React, { useState, useEffect } from 'react'
import './loginPage.css'
import { validateUser } from './Actions'
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const axios = require('axios')

function LoginPage(props) {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/')
        }
    })

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(email))
            return true
        return false
    }

    const SubmitForm = event => {
        event.preventDefault()
        if (password.length < 1)
            alert("Please enter password")
        if (validateEmail(email)) {
            axios.get("https://run.mocky.io/v3/afa1b987-0835-4ee1-9375-6f57caa5c609")
                .then(response => {
                    const token = response.data.token
                    props.validateUser(token)
                    localStorage.setItem("token", token)
                    navigate('/')
                })
                .catch(error => {
                    alert("ERRROR:", error)
                    const token = ""
                    props.validateUser(token)
                })
        }
        else
            alert("please correct email")
    }

    return (
        <div className='login-div'>
            <h1>Please Login</h1>
            <form onSubmit={SubmitForm}>
                <div>
                    <label>Email address:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type='Submit'>Submit</button>
            </form>
        </div>
    )
}

export default connect(null, { validateUser })(LoginPage)