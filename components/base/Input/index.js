import React from 'react'
import style from './style.module.css'

const Input = ({onChange, placeholder, value, type, name}) => {
  return (
    <input type={type} name={name} onChange={onChange} placeholder={placeholder} value={value} className={style.input}/>
  )
}

export default Input