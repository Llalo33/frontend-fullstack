import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignUp } from '../../features/applicationSlice';
import { NavLink } from 'react-router-dom';
import styles from './SignUp.module.css'

const SignUp = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()
    const error = useSelector((state) => state.application.error)

    const handleSetName = (e) => {
        setLogin(e.target.value)
    }

    const handleSetPass = (e) => {
        setPassword(e.target.value)
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        if (3 < login.length && login.length < 10 && 3 < password.length && password.length < 10) {
            dispatch(authSignUp({login, password}))
            window.location.replace('/login')
        } else {
            console.log({error})
        }

    }

    return (
        <form onSubmit={(e)=>handleSignUp(e)}>
            <input 
             type='text'
             value={login}
             placeholder='name'
             onChange={handleSetName}
            />
            <br />
            <input 
             type='password'
             value={password}
             placeholder='password'
             onChange={handleSetPass}
            />
            <br />
            {error && <p className={styles.font}>{error}</p>}
            <button className={styles.button} type='submit'>auth</button>
        </form>
    );
};

export default SignUp;