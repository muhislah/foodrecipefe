import React, { useState } from 'react'
import style from './style.module.css'
import Link from 'next/link'

const Header = () => {
  const [isLogin, setIsLogin] = useState(true)
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
          isLogin &&
          <div className={style.profile}>
            <img src="/asset/svg/profileicon.svg" alt="profile" />
            <p><Link href="/auth/login">Login</Link></p>
          </div>
        }

      </div>
    </>
  )
}

export default Header