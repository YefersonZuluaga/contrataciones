import { deleteDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../firebase'
import { obtenerDatos } from '../../../hooks/getUsersData'

const useReviewExamsViewModel = () => {
  const [dataUsers, setDataUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const rol = JSON.parse(localStorage.getItem('user')).rol

  const deleteAspirant = async (cedula) => {
    await deleteDoc(doc(db, 'usuarios', cedula))
    getData().catch((error) => console.log(error))
  }
  const columns = [
    {
      title: 'Cédula',
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
      key: 'estadoExamenes',
      render: (a) => {
        return <p className={a}>{a}</p>
      }
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (a) => {
        return (
          <>
            <button className="button-render" onClick={() => navigate(`/detail-exams/${a.cedula}`)}>
              Ver exámenes
            </button>
            {a.estadoExamenes == 'rechazados' ? (
              <button className="button-render" onClick={() => deleteAspirant(a.cedula)}>
                Eliminar
              </button>
            ) : a.estadoExamenes == 'aprobados' ? (
              <button
                className="button-render"
                onClick={() => navigate(`/form-aspirant/${a.cedula}`)}
              >
                Continuar Proceso
              </button>
            ) : null}
          </>
        )
      }
    }
  ]

  const getData = async () => {
    let values = await obtenerDatos()
    if (rol == 'supervisor') {
      let aux = values.filter((value) => value.estadoExamenes == 'pendiente')
      setDataUsers(aux)
      setLoading(false)

      return
    }
    let aux = values.filter((value) => value.estadoExamenes != 'pendiente')
    setDataUsers(aux)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    getData().catch((error) => console.log(error))
  }, [])

  return {
    dataUsers,
    columns,
    loading
  }
}

export default useReviewExamsViewModel
