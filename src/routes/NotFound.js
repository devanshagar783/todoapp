import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        }
    }, [])

    return (
        <h2>
            Looks like you are lost in space. <a href="/">Click here</a> to go home
        </h2>
    )
}
