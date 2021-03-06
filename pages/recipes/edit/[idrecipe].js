import React, { useEffect, useState } from 'react'
import style from './../../../styles/recipes.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import Button from '../../../components/base/Button/Index'
import Footer from '../../../components/module/Footer'
import Header from '../../../components/module/Header/Header'
import Swal from 'sweetalert2'

const Edit = ({ isLogin, token }) => {
    const fetchData = async () => {
        try {
            const result = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API + '/recipe/' + router.query.idrecipe)
            setDataGlo(result.data.data[0])
            console.log(dataGlo)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log('fetching data .. from db')
        fetchData()
    }, [])
    const router = useRouter()
    const { idrecipe } = router.query
    const [dataGlo, setDataGlo] = useState()
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
                    Authorization: `Bearer ${token}`
                },
                // withCredentials: true
            }
            const result = await axios.put(process.env.NEXT_PUBLIC_BACKEND_API + '/recipe/' + idrecipe, data, config)
            setUploading(false)
            Swal.fire(
                'Good Job',
                'Edit Recipe Success',
                'success'
              )
            router.push('/home')
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <>
            <Header isLogin={isLogin}/>
            <main className={style.main}>
                <h3 style={{ margin: "20px auto" }}>Edit Recipes</h3>
                <div className={style.boxImage}>
                    <img src={image.preview ? image.preview : dataGlo ? dataGlo.image : ""} alt="" width='100%' />
                    <input type="file" name="image" accept='image/*' onChange={handleImage} />
                </div>
                <input type="text" placeholder='Title' defaultValue={dataGlo && dataGlo.title} name="title" onChange={(e) => setTitle(e.target.value)} />
                <textarea name="ingredient" defaultValue={dataGlo && dataGlo.ingredient} id="" placeholder='Ingredient' onChange={(e) => setIngredient(e.target.value)}></textarea>
                <div className={style.boxVideo}>
                    {/* <video controls>
                <source src="movie.mp4" type="video/mp4" />
              </video> */}
                    <input type="file" name="video" id="" accept='video/*' onChange={handleVideo} />
                </div>
                <div style={{ width: '50%', margin: '30px auto' }}>
                    <Button title={uploading ? 'Updating...' : 'Update'} onClick={handleAdd} />
                </div>
            </main>
            <Footer />
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { token } = context.req.cookies

    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: true
            }
        }
    }

    return {
        props: {
            isLogin: true,
            token : token
        }
    }
}

export default Edit