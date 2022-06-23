import React from 'react'
import Button from '../../components/base/Button/Index'
import Input from '../../components/base/Input'
import Logomask from '../../components/module/Logomask'
import style from './../../styles/auth.module.css'
import Link from 'next/link'

const Login = () => {
  return (
    <>
        <Logomask />
        <div className={style.container}>
            <div className={style.input}>
                <h1 className={style.title} style={{textAlign:'center'}}>Welcome</h1>
                <p style={{textAlign:'center'}}>Log in into your exiting account</p>
                <br />
                <p>E-mail</p>
                <Input type="text" placeholder="Enter your email" />
                <p>Password</p>
                <Input type='password' placeholder="Enter your Password" />
                <br />
                <Button title="Login" />
                <p style={{textAlign:'right'}}>Forgot Password ?</p>
                <br />
                <p style={{textAlign:'center'}}>Don’t have an account? <span><Link href='/auth/register'>Sign up</Link></span></p>
            </div>
        </div>
    </>
  )
}

export default Login