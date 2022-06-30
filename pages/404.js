import React from 'react'
import Footer from '../components/module/Footer'
import Header from '../components/module/Header/Header'

const Page404 = ({isLogin}) => {
  return (
    <>
      <Header isLogin={isLogin}/>
      <div style={{
        height : 'calc(100vh - 380px) ',
        boxSizing : 'border-box',
        overflow : 'hidden',
        display : 'flex'
      }}>
        <h1 style={{
          margin: 'auto',
          fontSize: '79px'
        }}>404</h1>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies

  if(!token) {
    return {
      redirect : {
        destination : '/auth/login',
        permanent : true
      }
    }
  }

  return {
    props : {
      isLogin : true
    }
  }
}

export default Page404