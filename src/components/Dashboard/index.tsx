import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = ()=>{
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('jwt_token')
        console.log(token)
        if(token === undefined || token === null){
            navigate('/login')
        }
    })

    return <div>
        <h1>This is a dashboard</h1>
        <p>logout</p>
        <p>Add task</p>
        <p>Seach tasks</p>
    </div>
}

export default Dashboard