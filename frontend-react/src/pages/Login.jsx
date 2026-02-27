import React, { useState,useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../AuthProvider'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)

    const userData = {
      username,
      password
    }

    try{
      const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData)
      const data = await response.data
      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refresh", data.refresh)
      
      console.log("login successfully");
      setIsLoggedIn(true)
      navigate("/dashboard")
      
      // console.log(data.refresh);
      

    }catch(err){
      // console.log("invalid credentials")
      setErrors("invalid credentials")
  }finally{
    setLoading(false)
  }
}
  
  return (
    <>
    
     <div className='container'>
        <div className="row justify-content-center">
            <div className="col-md-6 bg-light-dark p-5 rounded">
                <h3 className='text-light text-center mb-4'>Login to our Portal</h3>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <input type="text" className='form-control' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} required />
                  </div>
                    
                    <div className='mb-3'>
                    <input type="password" className='form-control ' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>

                    { errors && <div className='text-danger'>{errors}</div> }

                    { loading ? (
                        <button type='submit' className='btn btn-info d-block mx-auto' disabled> <FontAwesomeIcon icon={faSpinner} spin/>please wait....</button>
                    ):
                      <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
                }
                </form>
            </div>
        </div>
    </div>
    
    
    
    
    </>
  )
}

export default Login