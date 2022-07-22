import React, { useState } from 'react'
import Button from '../../components/base/Button/Index'
import Input from '../../components/base/Input'
import Logomask from '../../components/module/Logomask'
import style from './../../styles/auth.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const Register = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    fullname : '',
    email : '',
    password : '',
    phone : ''
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = async (e) => {
    if(e) {
      e.preventDefault()
    }
    try {
      const result = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API+'/auth/register', user)
      console.log(result)
      if(result.data.message === 'USER HAS BEEN REGISTERED') {
        Swal.fire(
          'Caution!',
          'Email Has Been Registered, Please Login',
          'error'
        )
        router.push('/auth/login')
      }else {
        Swal.fire(
          'Good Job',
          'Register Success',
          'success'
        )
        router.push('/auth/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
        <Logomask />
        <div className={style.container}>
            <div className={style.input}>
                <h1 className={style.title} style={{textAlign:'center'}}>Welcome</h1>
                <p style={{textAlign:'center'}}>Please Register with Your Account</p>
                <br />
                <p>Name</p>
                <form onSubmit={handleSubmit}>
                  <Input type="text" placeholder="Name" onChange={handleChange} name="fullname" />
                  <p>E-mail</p>
                  <Input type="text" placeholder="Enter your email" onChange={handleChange} name="email"/>
                  <p>Phone Number</p>
                  <Input type="number" placeholder="Enter your phone Number" onChange={handleChange} name="phone"/>
                  <p>Create New Password</p>
                  <Input type='password' placeholder="Enter your Password" onChange={handleChange} name="password"/>
                  <p>Type New Password</p>
                  <Input type='password' placeholder="Retype your Password"/>
                </form>
                  <br />
                  <Button title="Register" onClick={handleSubmit}/>
                <br />
                <p style={{textAlign:'center'}}>Already have account? <span><Link href='/auth/login'>Log in Here</Link></span> </p>
            </div>
        </div>
    </>
  )
}

export default Register