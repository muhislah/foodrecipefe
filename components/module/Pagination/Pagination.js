import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'

const Pagination = ({totalPage}) => {
   const router = useRouter()
  totalPage = Array.from({length: totalPage}, (_, i) => i + 1)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
   router.push({
      pathname : '/home',
      hash : 'recipes',
      query : {
         ...router.query,
         page : currentPage
         }
      })
   },[currentPage])
  console.log(currentPage)
   return (
    <div className={style.pagination}>
      {
         totalPage.map((data) => {
            console.log(data)
            return <button className={style.buttonActive} key={data} onClick={() =>setCurrentPage(data)}>{data}</button>
         })
      }
    </div>
  )
}

export default Pagination