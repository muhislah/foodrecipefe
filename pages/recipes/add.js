import React, { useState } from 'react'
import Button from '../../components/base/Button/Index'
import Input from '../../components/base/Input'
import Footer from '../../components/module/Footer'
import Header from '../../components/module/Header/Header'
import style from './../../styles/recipes.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

const Add = () => {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState({})
  const [title, setTitle] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [video, setVideo] = useState({})

  const handleImage = (e) => {
    setImage({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    })
  }

  const handleVideo = (e) => {
    setVideo({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    })
  }

  const handleAdd = async () => {
    try {
      setUploading(true)
      const data = new FormData()
      data.append('title', title)
      data.append('image', image.file)
      data.append('ingredient', ingredient)
      data.append('video', video.file)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGlzYWhAZ21haWwuY29tIiwiaWQiOiI5MDc0MjFiMC05NmUyLTRiMTgtODllZC00NDllMDE3NjUxNWUiLCJ0eXBlIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjU1OTQxOTM3LCJleHAiOjE2NTYwMjgzMzd9.ZzakJOW7bgiayv7oit5yysve-0bR2bxqDt-wHeX-PbE`
        }
      }
      const result = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API+'/recipe/add', data , config)
      setUploading(false)
      alert('Add New Recipe Success')
      router.push('/home')
    } catch (error) {
      console.log(error)
    }


  }
  return (
    <>
      <Header />
      <main className={style.main}>
        <h3 style={{ margin: "20px auto" }}>Add Recipes</h3>
        <div className={style.boxImage}>
          <img src={image.preview ? image.preview : "/asset/svg/addimage.svg"} alt="" width='70px' />
          <input type="file" name="image" accept='image/*' onChange={handleImage} />
        </div>
        <input type="text" placeholder='Title' name="title" onChange={(e) => setTitle(e.target.value)} />
        <textarea name="ingredient" id="" placeholder='Ingredient' onChange={(e) => setIngredient(e.target.value)}></textarea>
        <div className={style.boxVideo}>
          {/* <video controls>
                <source src="movie.mp4" type="video/mp4" />
              </video> */}
          <input type="file" name="video" id="" accept='video/*' onChange={handleVideo} />
        </div>
        <div style={{ width: '50%', margin: '30px auto' }}>
          <Button title={uploading ? 'Uploading...' : 'Post'} onClick={handleAdd} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Add