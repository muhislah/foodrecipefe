import React, { useState } from 'react'
import Button from '../../components/base/Button/Index'
import Input from '../../components/base/Input'
import Logomask from '../../components/module/Logomask'
import style from './../../styles/auth.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const Login = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const config = {
        withCredentials: true
      }
      const result = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', user, config)
      if (result.data.message == "USER NOT REGISTERED") {
        console.log(result)
        alert('USER NOT REGISTERED')
        router.push('/auth/register')
      } else if (result.data.message == "USERNAME OR PASSWORD WRONG") {
        alert('USER OR PASSWORD WRONG')
      } else {
        const token = result.data.data.token
        const cookie = await fetch({
          url : "api/loginnext",
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: {
            token : token
          }
        })
        const isToken = await cookie.JSON()
        if(!isToken) {
          return Swal.fire(
            'Caution!',
            'Log in Failed',
            'error'
          )
        }
        Swal.fire(
          'Good job!',
          'Log in Success',
          'success'
        )
        router.push('/home')
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
          <h1 className={style.title} style={{ textAlign: 'center' }}>Welcome</h1>
          <p style={{ textAlign: 'center' }}>Log in into your exiting account</p>
          <br />
          <p>E-mail</p>
          <Input type="text" placeholder="Enter your email" name="email" onChange={handleChange} />
          <p>Password</p>
          <Input type='password' placeholder="Enter your Password" name="password" onChange={handleChange} />
          <br />
          <Button title={loading ? "Logging in.." : "Login"} onClick={handleSubmit} />
          <p style={{ textAlign: 'right' }}>Forgot Password ?</p>
          <br />
          <p style={{ textAlign: 'center' }}>Don’t have an account? <span><Link href='/auth/register'>Sign up</Link></span></p>
        </div>
      </div>
    </>
  )
}
export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies
  console.log(token)
  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  } else {
    return {
      props: {
        isLogin: false
      }
    }
  }

}
export default Login