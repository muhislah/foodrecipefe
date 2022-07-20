import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'

const Sorter = () => {
    const router = useRouter()
    const [sortby, setSortby] = useState('title')
    const [sort, setSort] = useState('asc')
    const [valueSort, setValueSort] = useState(['A - Z', 'Z - A'])
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
    useEffect(()=> {
        if(sortby === 'title'){
            setValueSort(['A - Z', 'Z - A'])
        }else if (sortby === 'post_at'){
            setValueSort(['Oldest','Newest'])
        }else {
            setValueSort(['Last User','New User'])
        }
    },[sortby])
    return (
        <div className={style.group}>
            <select name="sortby" id="sortby" className={style.minimal} onChange={(e) => setSortby(e.target.value)}>
                <option value="title">Title</option>
                <option value="post_at">Date</option>
                <option value="id_user">User</option>
            </select>
            <select name="sort" id="sort" className={style.minimal} onChange={(e) => setSort(e.target.value)}>
                <option value="asc">{valueSort[0]}</option>
                <option value="desc">{valueSort[1]}</option>
            </select>
        </div>
    )
}



export default Sorter