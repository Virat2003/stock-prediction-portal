import React from 'react'
import Button from './Button'
import { Link , useNavigate} from 'react-router-dom'
import {AuthContext} from '../AuthProvider'
import { useContext } from 'react'
import { faL } from '@fortawesome/free-solid-svg-icons'

const header = () => {
  const navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const handleLogout = ()=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refresh")
    setIsLoggedIn(false)
    console.log("logout sucessfully");
    navigate("/login")
    
  }

  return (
    <>
    <nav className='navbar container pt-4 pb-3 align-items-start'>
       <Link className="navbar-brand text-light" to="/"> stock prediction portal </Link>

        <div>
            {/* <a className='btn btn-outline-info' href="">Login</a> */}
            { isLoggedIn ? (
              <>
              
              <Button text="Dashboard" class="btn-info" url="/dashboard" />
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </>
            ):(
              <>
            <Button text="Login" class="btn-outline-info" url="/login" />
            &nbsp;
            <Button text="Register" class="btn-info" url="/register"/>
            {/* <a className='btn btn-info' href="">Register</a> */}
            </>
            )}
        </div>
    </nav>
    
    
    
    
    
    </>
  )
}

export default header