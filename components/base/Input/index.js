import React from 'react'
import style from './style.module.css'

const Input = ({onChange, placeholder, value, type}) => {
  return (
    <input type={type} onChange={onChange} placeholder={placeholder} value={value} className={style.input}/>
  )
}

export default Input