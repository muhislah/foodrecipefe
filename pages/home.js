
import axios from "axios"
import { useEffect, useState } from "react"
import Card from "../components/module/Card"
import Footer from "../components/module/Footer"
import Header from "../components/module/Header/Header"
import style from "../styles/home.module.css"

const home = () => {
  const fetchdata = async () => {
    const result = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API+'/recipe/')
    setData(result.data.data)
  }
  const [data, setData] = useState([])
  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <>
      <div className={style.yellow}>
        <div className={style.image}>
          <img className={style.sawi} src="/asset/img/sawi.png" alt="" />
          <img src="/asset/img/plate.png" alt="" />
        </div>
      </div>
      <Header />
      <main className={style.main1}>
        <h1>Discover Recipe <br />
          & Delicious Food</h1>
        <form onSubmit>
          <input type="text" className={style.input} placeholder="Search Recipes" />
        </form>
      </main>
      <main className={style.main}>
        <h1>Recently Recipe</h1>
        <div className={style.container}>
          {
            data ? data.map((recipe) => <Card title={recipe.title} id={recipe.id} image={recipe.image}/>) : <h1>Sorry No Recipe Found</h1>
          }
          
        </div>
      </main>
      <Footer />
    </>
  )
}

export default home
