import React from 'react'
import { FaDoorClosed, FaUserAlt, FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'
import './index.scss'
const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="container-home">
      <Header path={"/review"} redirect={false}/>
      <div className="container-buttons">
        <div className="top">
          <button onClick={() => navigate('/create-aspirant')}>
            <FaUserPlus />
            <p>Crear Aspirante</p>
          </button>
          <button onClick={() => navigate('/review')}>
            <FaUserAlt />
            <p>Empleado</p>
          </button>
        </div>
        <div className="bottom">
          <button onClick={() => navigate('/')}>
            <FaDoorClosed />
            <p>Cerrar sesion</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
