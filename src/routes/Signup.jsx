import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db, provider } from '../firebase/firebaseConfig'

export const Signup = () => {

    const navigate = useNavigate();
    const collectionUser = collection(db, 'users')
    
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
        signInWithPopup (auth, provider)
        .then(res => {
            console.log(res)
            localStorage.setItem('users',res.user.accessToken )
           navigate("/")
        })
        .catch(err => console.log(err))
    }

    const handleSingup = () => {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          addDoc(collectionUser, {email: user.reloadUserInfo.email, password: user.reloadUserInfo.passwordHash, accessToken: user.accessToken})
          localStorage.setItem('users',user.accessToken )
          navigate("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    console.log(formData)
  return (
    <div  className='container'>
        <div className='signup'>
            <input type="email"  placeholder='Enter email' name="email" value={formData.email} onChange={handleChange}/>
            <input type="password" placeholder='Enter password' name="password" value={formData.password} onChange={handleChange}/>
            <button onClick={handleSingup}>Sing Up</button>
            <button onClick={singInGoogle}>Sing In With Google</button>

        </div>
    </div>
  )
}
