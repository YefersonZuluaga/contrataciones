import { Form, Input, message } from 'antd';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../../../firebase';


const useFormAspirantViewModel = () => {

  const navigate = useNavigate()

  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const [exams, setExans] = useState([])
  const [loading, setLoading] = useState(false)
  const [observations, setObservations] = useState("")
  const [disableTextArea, setDisableTextArea] = useState(false)
  const [photoProfile, setPhotoProfile] = useState("")
  const [disabledButton, setDisabledButton] = useState(false)

  const obtenerExamenes = async () => {
    const q = query(collection(db, "usuarios"), where("cedula", "==", userId));

    const querySnapshot2 = await getDocs(q);
    querySnapshot2.forEach((doc) => {
      setUserData(doc.data())
      setObservations(doc.data().observacionExamenes)
      doc.data().estadoExamenes != "pendiente" && setDisableTextArea(true)
    });
  }

  const onFinish = async (estado) => {
    message.info("cargando...")
    setDisabledButton(true)
    try {
      const coleccionRef = collection(db, 'usuarios')
      const docRef = doc(coleccionRef, userData.cedula)
      const docSnapshot = await getDoc(docRef)
      if (!docSnapshot.exists()) {
      } else {
        const docData = {
          cedula: userData.cedula,
          nombre: userData.nombre,
          apellido: userData.apellido,
          estadoExamenes: estado,
          observacionExamenes: observations
        }
        await setDoc(doc(db, 'usuarios', userData.cedula), docData).catch((e) => {
          console.log(e)
        })
        message.success("Aspirante actualizado exitosamente.")
        setTimeout(() => {
          setDisabledButton(false)
          navigate("/review")
        }, 2000);
      }
    } catch (erro) {
      console.error(erro)
      message.warning('ha ocurrido un error.')
    }
  }

  const getImages = () => {
    const listRef = ref(storage, `usuarios/${userId}/examenes`)
    const listaImagenes = []
    listAll(listRef)
      .then((res) => {
        res.items.map((item) => {
          listaImagenes.push(item.fullPath)
        })
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error)
      })
    let aux = []
    setTimeout(() => {
      listaImagenes.forEach((imagen) => {
        aux.push(getDownloadURL(ref(storage, imagen)))
      })
      Promise.all(aux).then(values => {
        setExans(values)
        setLoading(true)
      })
    }, 1000)
  }

  const getPhotoProfile = () => {
    const listRef = ref(storage, `usuarios/${userId}/perfil`)
    const listaImagenes = []
    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          listaImagenes.push(item.fullPath)
        })
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      })
    let aux = []
    setTimeout(() => {
      listaImagenes.forEach((imagen) => {
        aux.push(getDownloadURL(ref(storage, imagen)))
      })
      Promise.all(aux).then(values => {
        setPhotoProfile(values[0])
        // setLoading(true)
      })
    }, 1000)
  }

  useEffect(() => {
    obtenerExamenes().catch((error) => console.log(error))
    getImages()
    getPhotoProfile()
  }, [])


  return {
    navigate,
    TextArea,
    userId,
    userData,
    exams,
    loading,
    observations,
    setObservations,
    onFinish,
    disableTextArea,
    photoProfile,
    disabledButton,
    form
  }
}

export default useFormAspirantViewModel