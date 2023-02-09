import React, { useState } from 'react'
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from '../firebase/firebaseConfig';

export const Login = () => {

    const [formData , setFormData] = useState({email: "", password: "" })
   

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }


    const singInGoogle = () => {
        signInWithPopup(auth, provider)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

  return (
    <div  className='container'>
        <div className='signup'>
            <input type="email"  placeholder='Enter email' name="email" value={formData.email} onChange={handleChange}/>
            <input type="password" placeholder='Enter password' name="password" value={formData.password} onChange={handleChange}/>
            <button>Login</button>
            <button onClick={singInGoogle}>Sing In With Google</button>

        </div>
    </div>
  )
}
