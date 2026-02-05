import React from 'react'
import Button from './Button'

const header = () => {
  return (
    <>
    <nav className='navbar container pt-4 pb-3 align-items-start'>
        <a className="navbar-brand text-light" href="">stock prediction portal</a>

        <div>
            {/* <a className='btn btn-outline-info' href="">Login</a> */}
            <Button text="Login" class="btn-outline-info" />
            &nbsp;
            <Button text="Register" class="btn-info"/>
            {/* <a className='btn btn-info' href="">Register</a> */}

            
        </div>
    </nav>
    
    
    
    
    
    </>
  )
}

export default header