import React from 'react'
import Header from '../components/header/Header'
import { FaUserAlt, FaUserPlus , FaDoorClosed} from "react-icons/fa";
import './index.scss'
const Home = () => {
  return (
    <div className='container-home'>
      <Header />
      <div className='container-buttons'>
        <div className='top'>
          <button>
            <FaUserPlus />
            <p>Crear empleado</p>
          </button>
          <button>
            <FaUserAlt />
            <p>Empleado</p>
          </button>
        </div>
        <div className='bottom'>
          <button>
            <FaDoorClosed/>
            <p>Cerrar sesion</p>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Home