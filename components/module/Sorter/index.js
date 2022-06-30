import { useRouter } from 'next/router'
import React, { useState } from 'react'
import style from './style.module.css'

const Sorter = () => {
    const router = useRouter()
    const [sort, setSort] = useState('title')
    const handleSort = (e) => {
        setSort(e.target.value)
        router.push({
            pathname: '/home',
            hash: 'recipes',
            query: {
                ...router.query,
                sort : sort
            }
        })
    }
    return (
        <select name="sort" id="sort" className={style.minimal} onChange={(e) => handleSort(e)}>
            <option value="title">Title</option>
            <option value="post_at">Date</option>
            <option value="id_user">User</option>
        </select>
    )
}



export default Sorter