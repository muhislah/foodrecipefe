import React from 'react'
import style from './style.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import TwitchPlayer from 'react-player/twitch'

const Card = ({title, id, image, token}) => {
  const router = useRouter()
  
  const handleDelete = async (id_recipe) => {
    const config = {
      Authorization: `Bearer ${token}`
      // withCredentials : true
    }
    try {
      console.log(id)
      const result = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_API+'/recipe/'+id_recipe, config)
      alert('Delete Success')
      router.push('/home')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={style.card}  >
        <div className={style.button}>
          <div onClick={() => router.push('/recipes/edit/'+id)}>
            <img src="/asset/svg/editcard.svg" alt="edit" />
          </div>
          <div onClick={() => handleDelete(id)}>
          <img src="/asset/svg/deletecard.svg" alt="delete" />
          </div>
        </div>
        <Image src={image} layout='fill' objectFit='cover' />
        <h2 onClick={() => router.push('/recipes/'+id)}>{title ? title : 'Default Title'}</h2>
    </div>
  )
}

export default Card