import React, { useState } from 'react'
import style from './style.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const Header = ({isLogin}) => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const result = await fetch('api/logout')
      const{ logout } = await result.json()
      if (logout) {
        Swal.fire(
          'Success',
          'User Logout',
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
      <div className={style.header}>
        <ul>
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/recipes/add">Add Recipe</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
        {
          !isLogin ?
            <div className={style.profile}>
              <Link href="/profile"><img src="/asset/svg/profileicon.svg" alt="profile" /></Link>
              <p><Link href="/auth/login">Login</Link></p>
            </div> :
            <div className={style.profile}>
              <Link href="/profile"><img src="/asset/svg/profileicon.svg" alt="profile" /></Link>
              <p onClick={handleLogout} style={{
                cursor: "pointer"
              }}>Logout</p>
            </div>
        }

      </div>
    </>
  )
}

export default Header