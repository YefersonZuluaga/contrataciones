import React from 'react'
import Header from '../components/header/Header'
import { FaUserAlt, FaUserPlus , FaDoorClosed} from "react-icons/fa";
import './index.scss'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='container-home'>
      <Header />
      <div className='container-buttons'>
        <div className='top'>
          <button onClick={()=> navigate("/create-employee")}>
            <FaUserPlus />
            <p>Crear empleado</p>
          </button>
          <button>
            <FaUserAlt />
            <p>Empleado</p>
          </button>
        </div>
        <div className='bottom'>
          <button onClick={()=> navigate("/")}>
            <FaDoorClosed/>
            <p>Cerrar sesion</p>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Home