import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Footer from '../../components/module/Footer'
import Header from '../../components/module/Header/Header'
import style from '../../styles/recipes.module.css'
import {useRouter} from 'next/router'
import axios from 'axios'

const idrecipes = () => {
    const router = useRouter()
    const { idrecipes } = router.query
    const [data, setData] = useState()
    const fetchdata = async (idrecipes) => {
        const result = await axios.get('http://localhost:5000/recipe/'+idrecipes)
        const data = result.data.data[0]
        setData(data)
        console.log(data)
      }
      useEffect(() => {
        fetchdata(idrecipes)
      }, [])
    return (
    <>
        <Header />
        <div className={style.container}>
            <h1>{ data ? data.title : 'No Title'}</h1>
            <Image src={data ? data.image : '/asset/img/bread.png'} width="500px" height="400px" />
            <div className={style.ingredient}>
                <h3>Ingredient</h3>
                   {
                    data ? data.ingredient.map(item => <p>{item}</p> ) : 'No Ingredient'
                   } 
            </div>
            <div className={style.video}>
                <h3>Video Steps</h3>
                <video width="720" controls>
                    <source src={data && data.video} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
            </div>
            <div className={style.inputComment}>
                <input type="text" placeholder='Comment :'/>
                <button>Kirim</button>
            </div>
            <div className='style.comments'>
                <h3>Comment</h3>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default idrecipes