import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/todoapp/login')
        }
    }, [])

    return (
        <h2>
            Looks like you are lost in space. <a href="/todoapp/">Click here</a> to go home
        </h2>
    )
}
