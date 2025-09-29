import { useState } from "react"
import { redirect, useNavigate } from "react-router-dom"

const Signup = ()=>{
    const [username,  setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [error , setError] = useState('')
    const [errorVisible , setErrorVisible] = useState(false)
    const [passwordVisible , setPasswordVisibility] = useState(false)
    const navigate = useNavigate()

    const changeUsername = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const targetElement = e.target; 
        
       
        if (targetElement instanceof HTMLInputElement) {
           setUsername(targetElement.value)
    }
}
const changeEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const targetElement = e.target; 
        
       
        if (targetElement instanceof HTMLInputElement) {
           setEmail(targetElement.value)
    }
}

    const changePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const targetElement = e.target; 
        
       
        if (targetElement instanceof HTMLInputElement) {
           setPassword(targetElement.value)
    }
    
    }

    const CreateUser = async()=>{
        const url = 'http://localhost:3000/create-user'
        const options = {
            method:"POST",
            headers:{
                'Content-Type':'Application/json',
                "Accept":"Application/json",
                "Authorization":"Bearer "
            },
            body:JSON.stringify({username, password  , email})
        }
        const server_result = await fetch(url, options)
        if(server_result.ok){
            console.log('successful')
            navigate('/login')
        }
        else{
            setErrorVisible(true)
            setError(`Error: ${server_result.statusText}`)
        }
    }

    return <form onSubmit={(e)=>{
        e.preventDefault()
    }}>

    <div>
        <label htmlFor="username">Username</label> <br />
        <input type="text" id="username" placeholder="Enter Name" value={username} onChange={changeUsername} />
    </div>

 <div>
        <label htmlFor="Email">Email</label> <br />
        <input type="text" id="Email" placeholder="Enter Email" value={email} onChange={changeEmail} />
    </div>
    <div>
        <label htmlFor="password">Password</label> <br />
        <input type={passwordVisible? 'text' : 'password'} placeholder="enter password" value={password} onChange={changePassword} />
        <button type="button" onClick={()=>{setPasswordVisibility((p)=>!p)}}>{passwordVisible? 'Hide':'Show'} Password</button>
    </div>
    {errorVisible? <p>{error}</p> : ''}
    <button type="button" onClick={CreateUser}>Create User</button>
    </form>

}

export default Signup