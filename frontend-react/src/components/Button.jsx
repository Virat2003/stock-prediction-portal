import React from 'react'

const Button = (props) => {
  return (
    <>

    <a className={`btn ${props.class}`} href="">{props.text}</a>
    {/* <Link></Link> */}
     {/* &nbsp; */}
     {/* <a className='btn btn-info' href="">Register</a> */}

     </>
  )
}

export default Button