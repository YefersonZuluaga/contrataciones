import React from 'react'
import './styles.scss'
import { ImSad } from "react-icons/im";
import { useNavigate } from 'react-router-dom';



const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='container-notFound'>
      <div>
        <h1 className='icon'>
          <ImSad />
        </h1>
        <h1 className='titulo'>404</h1>
        <p className='contenido'>Page not found</p>
      </div>
      <button onClick={() => navigate("/home")} className='button'>Ir al incio</button>

    </div>
  )
}

export default NotFound
