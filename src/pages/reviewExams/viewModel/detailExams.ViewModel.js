import { Input, message } from 'antd';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../../../firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

const useDetailExamsViewModel = () => {

    const navigate = useNavigate()

    const { TextArea } = Input;
    const { userId } = useParams()
    const [userData, setUserData] = useState({})
    const [exams, setExans] = useState([])
    const [loading, setLoading] = useState(false)
    const [observations , setObservations] = useState("")
  
    const obtenerExamenes = async () => {
      const q = query(collection(db, "usuarios"), where("cedula", "==", userId));
  
      const querySnapshot2 = await getDocs(q);
      querySnapshot2.forEach((doc) => {
        setUserData(doc.data())
      });
    }
  
    const onFinish = async (estado) =>{
      
      try {
        const coleccionRef = collection(db, 'usuarios')
        const docRef = doc(coleccionRef, userData.cedula)
        const docSnapshot = await getDoc(docRef)
        if (!docSnapshot.exists()) {
          console.log('existe')
        } else {
          const docData = {
            cedula: userData.cedula,
            nombre: userData.nombre,
            apellido: userData.apellido,
            estadoExamenes: estado
          }
          await setDoc(doc(db, 'usuarios', userData.cedula), docData).catch((e) => {
            console.log(e)
          })
          message.success("Aspirante actualizado exitosamente.")
          setTimeout(() => {
            navigate("/review")
          }, 2000);
        }
      } catch (erro) {
        console.log(erro)
        message.warning('ha ocurrido un error.')
      }
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
  
  
  return {
    navigate ,
    TextArea , 
    userId ,
    userData , 
    exams ,
    loading , 
    observations , 
    setObservations , 
    onFinish
  }
}

export default useDetailExamsViewModel