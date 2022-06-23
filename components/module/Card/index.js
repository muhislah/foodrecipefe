import React from 'react'
import style from './style.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'

const Card = ({title, id, image}) => {
  const handleDelete = async (id_recipe) => {
    const config = {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGlzYWhAZ21haWwuY29tIiwiaWQiOiI5MDc0MjFiMC05NmUyLTRiMTgtODllZC00NDllMDE3NjUxNWUiLCJ0eXBlIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjU1OTQxOTM3LCJleHAiOjE2NTYwMjgzMzd9.ZzakJOW7bgiayv7oit5yysve-0bR2bxqDt-wHeX-PbE`
      }
    }
    try {
      console.log(id)
      const result = await axios.delete('http://localhost:5000/recipe/'+id_recipe, config)
      router.push('/home')
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()

  return (
    <div className={style.card}>
        <div className={style.button}>
          <button onClick={() => router.push('/recipes/edit/'+id)}>Edit</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
        <Image src={image} layout='fill' objectFit='cover'/>
        <h2 onClick={() => router.push('/recipes/'+id)}>{title ? title : 'Default Title'}</h2>
    </div>
  )
}

export default Card