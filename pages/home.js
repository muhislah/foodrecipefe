import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CardHome from "../components/module/CardHome"
import Footer from "../components/module/Footer"
import Header from "../components/module/Header/Header"
import Pagination from "../components/module/Pagination/Pagination"
import Sorter from "../components/module/Sorter"
import style from "../styles/home.module.css"

const Home = ({ data, isLogin, pagination }) => {
  const [search, setSearch] = useState('')
  const router = useRouter()
  // const [data, setData] = useState([])
  // const fetchdata = async () => {
  //   const result = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API+'/recipe/')
  //   setData(result.data.data)
  // }
  // useEffect(() => {
  //   console.log('fetching..')
  //   fetchdata()
  // }, [])
  const handleSearch = (e) => {
    e.preventDefault()
    if(!search){
      return router.push({
        pathname: '/home',
        query : {
          search : search
        }
      })
    }
    console.log('handlesearch')
    router.push({
      pathname: '/home',
      hash : "recipes",
      query : {
        search : search
      }
    })
    
  }
  return (
    <>
      <div className={style.yellow}>
        <div className={style.image}>
          <img className={style.sawi} src="/asset/img/sawi.png" alt="" />
          <img src="/asset/img/plate.png" alt="" />
        </div>
      </div>
      <Header isLogin={isLogin} />
      <main className={style.main1}>
        <h1>Discover Recipe <br />
          & Delicious Food</h1>
        <form onSubmit={(e) => handleSearch(e)}>
          <input type="text" className={style.input} placeholder="Search Recipes" onChange={(e) => setSearch(e.target.value)}/>
        </form>
      </main>
      <main className={style.main} id="recipes">
        <h1>Recently Recipe <Sorter /></h1>
        <div className={style.container}>
          {
            data?.length > 0 ? data.map((recipe) => <CardHome key={recipe.id} title={recipe.title} id={recipe.id} image={recipe.image} />) : <h2>Sorry No Recipe Found</h2>
          }
        </div>
        <div className={style.pagination}>
          <Pagination totalPage={pagination?.totalPage} currentPage={pagination?.page}/>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const search = context.query.search || ''
  const page = context.query.page || 1
  const sortby = context.query.sortby || 'title'
  const sort = context.query.sort || 'asc'
  const data = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+`/recipe?page=${page}&sortby=${sortby}&sort=${sort}&search=${search }`)
  const result = await data.json()
  const { token } = context.req.cookies
  return {
    props: {
      data: result.data,
      isLogin : token ? true : false,
      pagination : result.pagination
  }
}
}

export default Home
