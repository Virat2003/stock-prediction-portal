import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const header = () => {
  return (
    <>
    <nav className='navbar container pt-4 pb-3 align-items-start'>
       <Link className="navbar-brand text-light" to="/"> stock prediction portal </Link>

        <div>
            {/* <a className='btn btn-outline-info' href="">Login</a> */}
            <Button text="Login" class="btn-outline-info" url="/login" />
            &nbsp;
            <Button text="Register" class="btn-info" url="/register"/>
            {/* <a className='btn btn-info' href="">Register</a> */}

            
        </div>
    </nav>
    
    
    
    
    
    </>
  )
}

export default header