import { Image, Input } from 'antd'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../../../../../firebase'
import Header from '../../../components/header/Header'
import '../../styles/detailExams.scss'

const DetailExams = () => {

  const { TextArea } = Input;
  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const [exams, setExans] = useState([])
  const [loading, setLoading] = useState(false)

  const obtenerExamenes = async () => {
    const q = query(collection(db, "usuarios"), where("cedula", "==", userId));

    const querySnapshot2 = await getDocs(q);
    querySnapshot2.forEach((doc) => {
      setUserData(doc.data())
    });
  }

  const prueba2 = () => {
    const listRef = ref(storage, `usuarios/${userId}`)
    const listaImagenes = []
    listAll(listRef)
      .then((res) => {
        res.items.map((item) => {
          listaImagenes.push(item.fullPath)
        })
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      })
    let aux = []
    setTimeout(() => {
      console.log(listaImagenes)
      listaImagenes.map((imagen) => {
        aux.push(getDownloadURL(ref(storage, imagen)))
      })
      console.log(aux)
      Promise.all(aux).then(values => {
        setExans(values)
        console.log("values", values)
        setLoading(true)
      })
    }, 2000)
  }


  useEffect(() => {
    obtenerExamenes()
    prueba2()
  }, [])


  return <>
    <Header />
    <div className='container-detailExams'>
      <div className='prueba'>
        <div className='container'>
          <Image
            width={150}
            className='profile'
            preview={false}
            src="https://firebasestorage.googleapis.com/v0/b/contrataci0nes.appspot.com/o/usuarios%2F1005093860%2Fdescarga.jpg?alt=media&token=5a00c079-8fbe-41eb-9338-47426d4866c8"
          />
          <p>{`${userData && userData.nombre} ${userData && userData.apellido}`}</p>
        </div>
        <div className='container-card'>
          <h1>Revisión Examenes Medicos</h1>
          <h3>Identificacion{` ${userData && userData.cedula}`}</h3>
          <div className='container-images'>
            {loading ? exams.map((item) => (
              <Image
                width={150}
                src={item}
              />
            )) : "Cargando"}
          </div>
          <div className='container-textArea'>
            <p>Observaciones :</p>
            <TextArea rows={4} className="textArea" />
          </div>
          <div className='container-buttons'>
            <button>Aprobar</button>
            <button>Rechazar</button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default DetailExams
