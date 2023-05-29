import React from 'react'
import { FaDoorClosed, FaUserAlt, FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'
import './index.scss'
const Home = () => {
  const navigate = useNavigate()
  const rol = JSON.parse(localStorage.getItem('user')).rol

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <div className="container-home">
      <Header path={'/review'} redirect={false} />
      <div className="container-buttons">
        {rol == 'empleado' ? (
          <div className="top-empleado">
            <button onClick={() => navigate('/create-aspirant')}>
              <FaUserPlus />
              <p>Crear Aspirante</p>
            </button>
            <button onClick={() => navigate('/review')}>
              <FaUserAlt />
              <p>Lista Aspirantes</p>
            </button>
          </div>
        ) : (
          <div className="top-supervisor">
            <button onClick={() => navigate('/review')}>
              <FaUserAlt />
              <p>Listado Aspirantes Pendientes</p>
            </button>
          </div>
        )}
        <div className="bottom">
          <button onClick={logout}>
            <FaDoorClosed />
            <p>Cerrar sesión</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
