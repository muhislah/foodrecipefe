import React, { useState } from 'react'
import Button from '../../components/base/Button/Index'
import Footer from '../../components/module/Footer'
import Header from '../../components/module/Header/Header'
import style from './../../styles/recipes.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

const Add = ({isLogin}) => {
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
          'content-type': 'multipart/form-data'
        },
        withCredentials : true
      }
      const result = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API+'/recipe/add', data , config)
      if (result.data.message === 'token invalid'){
        alert('Token Invalid, Add Recipe Failed, Please Login First')
        return router.push('/auth/login')
      }
      setUploading(false)
      alert('Add New Recipe Success')
      router.push('/home')
    } catch (error) {
      console.log(error)
    }


  }
  return (
    <>
      <Header isLogin={isLogin}/>
      <main className={style.main}>
        <h3 style={{ margin: "20px auto" }}>Add Recipes</h3>
        <div className={style.boxImage}>
          {
            image.preview ? 
            <img src={image.preview} alt="" width="100%"/> :
            <img src="/asset/svg/addimage.svg" alt="" width='70px' />
          }
          
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

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies

  if(!token) {
    return {
      redirect : {
        destination : '/auth/login',
        permanent : true
      }
    }
  }

  return {
    props : {
      isLogin : true
    }
  }
}

export default Add