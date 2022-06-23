import React from 'react'
import style from './style.module.css'

const Footer = () => {
  return (
    <footer className={style.footer}>
        <h1>Eat, Cook, Repeat</h1>
        <p>Share your best recipe by uploading here !</p>
        <ul>
            <li>Product</li>
            <li>Company</li>
            <li>Learn More</li>
            <li>Get in Touch</li>
        </ul>

    </footer>
  )
}

export default Footer