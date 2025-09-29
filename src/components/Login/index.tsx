import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = ()=>{
        const [email,  setEmail] = useState('')
        const [password , setPassword] = useState('')
        const [passwordVisible , setPasswordVisibility] = useState(true)
        const [error , setError] = useState('')
        const [errorVisible , setErrorVisible] = useState(false)

        const navigate = useNavigate()
    
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

        const LoginUser =  async()=>{
            const url = 'http://localhost:3000/login'
            const options = {
                method:'PUT', 
                headers:{
                    'Content-Type':'Application/json',
                    'Accept':'Application/json',
                    
                    
                },
                body:JSON.stringify({email , password})
            }
            const result  = await fetch(url ,options)
            if(result.ok){

                const readable_result = await result.json()
            const {token }=  readable_result
            localStorage.setItem('jwt_token' ,token)
            navigate('/dashboard')
            }
            else{
            setErrorVisible(true)
            setError(`Error : ${result.statusText}`)
        }
            

        }

    return <form onSubmit={(e)=>{
        e.preventDefault()
    }}>

    <div>
        <label htmlFor="email">Email</label> <br />
        <input type="text" id="email" placeholder="Enter Email" value={email}  onChange={changeEmail}  />
    </div>

    <div>
        <label htmlFor="password">Password</label> <br />
        <input type={passwordVisible? 'text' : 'password'} placeholder="enter password" value={password} onChange={changePassword} />
        <button type="button" onClick={()=>{setPasswordVisibility((p)=>!p)}}>{passwordVisible? 'Hide':'Show'} Password</button>
    </div>
      {errorVisible? <p>{error}</p> : ''}
    <button type="button" onClick={LoginUser}>Login User</button>
    </form>

   

}

export default Login