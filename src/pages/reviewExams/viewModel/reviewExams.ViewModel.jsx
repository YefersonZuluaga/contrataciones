import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerDatos } from '../../../hooks/getUsersData'

const useReviewExamsViewModel = () => {
  const [dataUsers, setDataUsers] = useState([])

  const navigate = useNavigate()

  const columns = [
    {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula'
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre'
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido'
    },
    {
      title: 'Estado',
      dataIndex: 'estadoExamenes',
      key: 'estadoExamenes' ,
      render: (a) => {
        console.log(a)
        return ( <p className={a} >{a}</p>)
      }
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (a) => {
        return (
          <button className="button-render" onClick={() => navigate(`/detail-exams/${a.cedula}`)}>
            Ver examenes
          </button>
        )
      }
    }
  ]

  const prueba = async () => {
    let values = await obtenerDatos()
    setDataUsers(values)
  }

  useEffect(() => {
    prueba()
  }, [])

  return {
    dataUsers, columns
  }
}

export default useReviewExamsViewModel