import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { obtenerDatos } from '../../hooks/getUsersData'
import Header from '../components/header/Header'
import './styles.scss'

const ReviewExams = () => {
  const [dataUsers, setDataUsers] = useState([])
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ]

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
      render: () => {
        return <button>Ver examenes</button>
      }
    }
  ]
  const prueba = async () => {
    let values = await obtenerDatos()
    console.log(values)
    setDataUsers(values)
  }

  useEffect(() => {
    // let prueba = obtenerDatos().then((value) => {
    // // value.forEach((doc) => {
    // //   // doc.data() is never undefined for query doc snapshots
    // //   console.log(doc.id, ' => ', doc.data())
    // // })
    // console.log(value)

    // })

    // console.log(prueba)
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
