import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerDatos } from '../../hooks/getUsersData'
import Header from '../components/header/Header'
import './styles.scss'

const ReviewExams = () => {
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
      key: 'estadoExamenes'
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (a) => {
        return <button onClick={()=>  navigate(`/detail-exams/${a.cedula}`)}>Ver examenes</button>
      }
    }
  ]

  const prueba = async () => {
    let values = await obtenerDatos()
    console.log(values)
    setDataUsers(values)
  }

  useEffect(() => {
  
    prueba()
  }, [])

  return (
    <div className="container-reviewExamns">
      <Header />
      <div className="table">
        <Table dataSource={dataUsers} columns={columns} />
      </div>
    </div>
  )
}

export default ReviewExams
