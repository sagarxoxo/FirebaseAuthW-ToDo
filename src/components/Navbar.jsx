import React from 'react'

export const Navbar = () => {
  return (
    <div className='nav'>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="login">Login</a></li>
            <li><a href="signup">Sign up</a></li>
            <li><a>Logout</a></li>
        </ul>
    </div>
  )
}
