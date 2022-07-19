// import { useRouter } from "next/router"
// import { useEffect, useState } from "react"
// import CardHome from "../components/module/CardHome"
// import Footer from "../components/module/Footer"
// import Header from "../components/module/Header/Header"
// import Pagination from "../components/module/Pagination/Pagination"
// import style from "../styles/home.module.css"

// const Allrecipes = ({ data, isLogin}) => {
//   return (
//     <>
//       <Header isLogin={isLogin} />
//       <main className={style.main} id="recipes">
//         <h1>All Recipes</h1>
//         <div className={style.container}>
//           {
//             data ? data.map((recipe) => <CardHome key={recipe.id} title={recipe.title} id={recipe.id} image={recipe.image} />) : <h1>Sorry No Recipe Found</h1>
//           }
//         </div>

//       </main>
//       <Footer />
//     </>
//   )
// }

// export const getStaticProps = async (context) => {
//   const data = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/recipe?limit=1000')
//   const result = await data.json()
//   return {
//     props: {
//       data: result.data,
//       isLogin : true,
//   }
// }
// }

// export default Allrecipes
