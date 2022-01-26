import React, { Component, useState, getState, useEffect } from 'react'
import './loginPage.css'
import validateUser from './LoginActions'
import { connect, useSelector, useDispatch, useStore } from "react-redux";
// import { useHistory } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// import {Navigate} from 'react-router-dom'
const axios = require('axios')

// export default function LoginPage(props) {

//     const store = useStore()
//     const state = store.getState()
//     // console.log()

//     return (
//         <div>
//             <h2>Hello</h2>
//             <div className='login-div'>
//                 <h1>Please Login</h1>
//                 <form onSubmit={submitForm}>
//                     <div>
//                         <label>Email address:</label>
//                         <input type="email" value={state.email} onChange={handleEmailChange} />
//                     </div>
//                     {/* <div>
//                         <label>Password:</label>
//                         <input type="password" value={props.password} onChange={this.handlePasswordChange} />
//                     </div>
//                     <button type='Submit'>Submit</button>  */}
//                 </form>
//             </div>
//         </div>
//     )
// }





// const mapStateToProps = state => {
//     return {
//         email: state.email,
//         password: state.password,
//         token: state.token,
//         isLoggedIn: state.isLoggedIn
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         validateUser: (token) => dispatch(validateUser(token))
//     }
// }

function LoginPage(props) {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate('/')
        }
    })

    const handleEmailChange = (event) => {
        // setEmail({
        //     email: event.target.value
        // })
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        // setPassword({
        //     password: event.target.value
        // })
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
                    // this.props.history.push('/create-todo-task');
                    // this.context.history.push('/create-toto-task')
                    console.log("here");
                    // <Navigate to="/create-todo-task" replace={true}/>;
                    // valid(token)
                    // history.push('/')
                })
                .catch(error => {
                    // alert("Error: "+ error)
                    console.log("Error: ", error)
                    const token = ""
                    props.validateUser(token)
                })
            // }
        }
        else
            alert("please correct email")
        // alert("hello")
    }

    // componentDidMount(){
    // localStorage.clear()
    // const token=localStorage.getItem("token")
    // this.props.validateUser(token)
    // console.log(token) 
    // reroute here
    // }

    // componentWillMount(){

    // }

    // render() {
    // const history = useHistory()

    return (
        <div>
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
        </div>
    )
    // }
}

export default connect(null, { validateUser })(LoginPage)





// export default LoginPage
