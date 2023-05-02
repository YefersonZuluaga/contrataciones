import React from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='container-header'>
      <img src='https://firebasestorage.googleapis.com/v0/b/contrataci0nes.appspot.com/o/imagenes%2Ficon3.png?alt=media&token=82ba5cd7-1c31-44ab-a4af-a8e290916af8' 
       onClick={()=> navigate("/home")}
      />
        {/* <div className='name-bussiness'>Contrataciones</div> */}
        {/* <div>Bienvenid@ Juliana</div> */}
    </div>
  )
}

export default Header