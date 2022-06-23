import React, { useEffect, useState } from 'react'
import Footer from '../../components/module/Footer'
import Header from '../../components/module/Header/Header'
import style from '../../styles/profile.module.css'
import Link from 'next/link'
import Card from '../../components/module/Card'
import axios from 'axios'

const Profile = () => {
    const [edit, setEdit] = useState(false)
    const [selected, setSelected] = useState('my recipe')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGlzYWhAZ21haWwuY29tIiwiaWQiOiI5MDc0MjFiMC05NmUyLTRiMTgtODllZC00NDllMDE3NjUxNWUiLCJ0eXBlIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjU1OTQxOTM3LCJleHAiOjE2NTYwMjgzMzd9.ZzakJOW7bgiayv7oit5yysve-0bR2bxqDt-wHeX-PbE'
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const result = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API+'/recipe/')
            setData(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
        console.log(data)
    }, [])
    
  return (
    <>
        <Header/>
        <main>
            <div className={style.profile}>
                <img src="/asset/img/profile.png" alt="" />
                <img src="/asset/svg/edit.svg" className={style.edit} alt="" style={{cursor: "pointer"}} onClick={() => setEdit((edit) => !edit)}/>
                <div className={edit ? style.menu : style.menuActive}>
                    <p><Link href='/profile/edit'>Change photo profile</Link></p>
                    <hr style={{margin:'0'}}/>
                    <p><Link href='/profile/edit'>Change password</Link></p>
                </div>
            </div>
            <h2 style={{margin : "40px auto", textAlign: 'center'}}>Garneta Sharina</h2>
            <div className={style.navigation}>
                <ul>
                    <li className={ selected == 'my recipe' ? style.recipeActive : ''} onClick={() => setSelected('my recipe')}>My Recipe</li>
                    <li className={ selected == 'saved recipe' ? style.recipeActive : ''} onClick={() => setSelected('saved recipe')}>Saved Recipe</li>
                    <li className={ selected == 'liked recipe' ? style.recipeActive : ''} onClick={() => setSelected('liked recipe')}>Liked Recipe</li>
                </ul>
                <div className={style.area}>
                    {
                        data ? data.map((recipe) => <Card title={recipe.title} id={recipe.id} image={recipe.image}/>) : <h1>Sorry No Recipe Found</h1>
                    }
                </div>
            </div>
        </main>
        <Footer />
    </>
  )
}

export default Profile