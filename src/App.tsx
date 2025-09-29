import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
const App = ()=>{
  return <Routes>
    <Route path='/' element = {<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>


}

export default App