import React, { useEffect, useState } from 'react'
import Footer from '../../components/module/Footer'
import Header from '../../components/module/Header/Header'
import style from '../../styles/profile.module.css'
import Link from 'next/link'
import Card from '../../components/module/Card'
import axios from 'axios'

const Profile = ({ isLogin, token }) => {
    const [edit, setEdit] = useState(false)
    const [selected, setSelected] = useState('my recipe')
    const [data, setData] = useState([])
    const [profile , setProfile] = useState({})
    const fetchProfile = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const result = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API+'/profile', {
                // withCredentials : true,
                ...config
            })
            setProfile(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const result = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API+'/profile/recipes/', {
                // withCredentials : true, 
                ...config
            })
            setData(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
        fetchProfile()
    }, [])
    console.log(profile)
    return (
        <>
            <Header isLogin={isLogin} />
            <main>
                <div className={style.profile}>
                    <img src="/asset/img/profile.png" alt="" style={{
                        borderRadius : '50%',
                        width : '150px',
                        height : '150px'
                    }}/>
                    <img src="/asset/svg/edit.svg" className={style.edit} alt="" style={{ cursor: "pointer" }} onClick={() => setEdit((edit) => !edit)} />
                    <div className={edit ? style.menu : style.menuActive}>
                        <p><Link href='/profile/edit'>Change photo profile</Link></p>
                        <hr style={{ margin: '0' }} />
                        <p><Link href='/profile/edit'>Change password</Link></p>
                    </div>
                </div>
                <h2 style={{ margin: "40px auto", textAlign: 'center' }}>{profile ? profile.fullname : 'No Name'}</h2>
                <div className={style.navigation}>
                    <ul>
                        <li className={selected == 'my recipe' ? style.recipeActive : ''} onClick={() => setSelected('my recipe')}>My Recipe</li>
                        <li className={selected == 'saved recipe' ? style.recipeActive : ''} onClick={() => setSelected('saved recipe')}>Saved Recipe</li>
                        <li className={selected == 'liked recipe' ? style.recipeActive : ''} onClick={() => setSelected('liked recipe')}>Liked Recipe</li>
                    </ul>
                    <div className={style.area}>
                        {
                            data ? data.map((recipe) => <Card key={recipe.id} title={recipe.title} id={recipe.id} image={recipe.image} token={token} />) : <h1>Sorry No Recipe Found</h1>
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { token } = context.req.cookies
    // console.log("tampilkan token")
    // console.log(token)
    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
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


export default Profile