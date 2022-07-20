import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'

const Sorter = () => {
    const router = useRouter()
    const [sortby, setSortby] = useState('title')
    const [sort, setSort] = useState('asc')
    useEffect(() => {
        router.push({
            pathname: '/home',
            hash: 'recipes',
            query: {
                ...router.query,
                sortby: sortby,
                sort : sort
            }
        })
    }, [sortby, sort])

    return (
        <div className={style.group}>
            <select name="sortby" id="sortby" className={style.minimal} onChange={(e) => setSortby(e.target.value)}>
                <option value="title">Title</option>
                <option value="post_at">Date</option>
                <option value="id_user">User</option>
            </select>
            <select name="sort" id="sort" className={style.minimal} onChange={(e) => setSort(e.target.value)}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    )
}



export default Sorter