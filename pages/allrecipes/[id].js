// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import ReactPlayer from 'react-player'
// import Footer from '../../components/module/Footer'
// import Header from '../../components/module/Header/Header'
// import style from '../../styles/recipes.module.css'
// import {useRouter} from 'next/router'
// import axios from 'axios'

// const DetailRecipe = ({isLogin, recipe}) => {
//     const router = useRouter()
//     return (
//     <>
//         <Header isLogin={isLogin}/>
//         <div className={style.container}>
//             <h1>{ recipe?.title || 'no Title'}</h1>
//             <Image src={recipe?.image || '/asset/img/bread.png'} width="500px" height="400px" />
//             <div className={style.ingredient}>
//                 <h3>Ingredient</h3>
//                    {
//                     recipe?.ingredient.map(item => <p key={item}>{item}</p> ) || 'No Ingredient'
//                    } 
//             </div>
//             <div className={style.video}>
//                 <h3>Video Steps</h3>
//                 {
//                     recipe?.video ? (
//                         <video width="100%" controls>
//                             <source src={recipe.video} type="video/mp4" />
//                             Your browser does not support HTML video.
//                         </video>
//                     ) : <h1>Loading Video...</h1>
//                 }
               
//             </div>
//             <div className={style.inputComment}>
//                 <input type="text" placeholder='Comment :'/>
//                 <button>Kirim</button>
//             </div>
//             <div className='style.comments'>
//                 <h3>Comment</h3>
//             </div>
//         </div>
//         <Footer />
//     </>
//   )
// }

// export async function getStaticPaths() {

//     return {
//       paths: [
//         { params: { id : '115e091c-574e-47b9-8fcc-f538e9dda633'} },
//         { params: { id : '16dce80c-9704-47bf-aeb6-7d2890c1f5a3'} },


//       ],
//       fallback: false
//     };
//   }

// export const getStaticProps = async (context) => {
//     const {id : idrecipes} = context.params
//     const data = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/recipe/'+idrecipes)
//     const result = await data.json()
//     return {
//       props : {
//         isLogin : true,
//         recipe : result.data[0]
//       }
//     }
//   }

// export default DetailRecipe