import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Footer from '../../components/module/Footer'
import Header from '../../components/module/Header/Header'
import style from '../../styles/recipes.module.css'
import {useRouter} from 'next/router'
import axios from 'axios'

const Idrecipes = ({isLogin}) => {
    const router = useRouter()
    const { idrecipes } = router.query
    const [data, setData] = useState()
    const fetchdata = async (idrecipes) => {
        const result = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API+'/recipe/'+idrecipes)
        const data = result.data.data[0]
        setData(data)
        console.log(data)
      }
      useEffect(() => {
        fetchdata(idrecipes)
      }, [])
    return (
    <>
        <Header isLogin={isLogin}/>
        <div className={style.container}>
            <h1>{ data ? data.title : 'No Title'}</h1>
            <Image src={data ? data.image : '/asset/img/bread.png'} width="500px" height="400px" />
            <div className={style.ingredient}>
                <h3>Ingredient</h3>
                   {
                    data ? data.ingredient.map(item => <p key={item}>{item}</p> ) : 'No Ingredient'
                   } 
            </div>
            <div className={style.video}>
                <h3>Video Steps</h3>
                {
                    data ? (
                        <video width="100%" controls>
                            <source src={data.video} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                    ) : <h1>Loading Video...</h1>
                }
               
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

export default Idrecipes