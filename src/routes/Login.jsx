import React, { useContext, useState } from 'react'
import { signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth"
import { auth, provider } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UseContext';

export const Login = () => {

    const [formData , setFormData] = useState({email: "", password: "" })
    const navigate = useNavigate();
    const contUser = useContext(UserContext)
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
        .then(res => {
            console.log(res)
            localStorage.setItem('users',res.user.uid )
           navigate("/")
           contUser.setUser(res.user.uid)
        })
        .catch(err => console.log(err))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth,formData.email, formData.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
            localStorage.setItem('users',user.uid )
          navigate("/")
          contUser.setUser(user.uid)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

  return (
    <div  className='container'>
        <div className='signup'>
            <input type="email"  placeholder='Enter email' name="email" value={formData.email} onChange={handleChange}/>
            <input type="password" placeholder='Enter password' name="password" value={formData.password} onChange={handleChange}/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={singInGoogle}>Sing In With Google</button>

        </div>
    </div>
  )
}
