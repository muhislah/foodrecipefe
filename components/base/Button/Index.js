import React from 'react'
import style from './style.module.css'

const Button = ({onClick, title}) => {
  return (
    <button onClick={onClick} className={style.button}>{title}</button>
  )
}

export default Button