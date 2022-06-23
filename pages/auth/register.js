import React from 'react'
import Button from '../../components/base/Button/Index'
import Input from '../../components/base/Input'
import Logomask from '../../components/module/Logomask'
import style from './../../styles/auth.module.css'
import Link from 'next/link'

const Register = () => {
  return (
    <>
        <Logomask />
        <div className={style.container}>
            <div className={style.input}>
                <h1 className={style.title} style={{textAlign:'center'}}>Welcome</h1>
                <p style={{textAlign:'center'}}>Please Register with Your Account</p>
                <br />
                <p>Name</p>
                <Input type="text" placeholder="Name" />
                <p>E-mail</p>
                <Input type="text" placeholder="Enter your email" />
                <p>Phone Number</p>
                <Input type="text" placeholder="Enter your email" />
                <p>Create New Password</p>
                <Input type='password' placeholder="Enter your Password" />
                <p>Type New Password</p>
                <Input type='password' placeholder="Enter your Password" />
                <br />
                <Button title="Register" />
                <br />
                <p style={{textAlign:'center'}}>Already have account? <span><Link href='/auth/login'>Log in Here</Link></span> </p>
            </div>
        </div>
    </>
  )
}

export default Register