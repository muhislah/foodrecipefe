import React from 'react'
import style from './style.module.css'
import logo from '../../../public/asset/svg/mamarecipe.svg'
import Image from 'next/image'
import Link from 'next/link'

const Logomask = () => {
  return (
    <div className={style.Logomask}>
        <div></div>
        <Link href='/home'>
        <Image
            width='75px'
            src={logo}
            alt="Home"
        />
         </Link>
    </div>
  )
}

export default Logomask