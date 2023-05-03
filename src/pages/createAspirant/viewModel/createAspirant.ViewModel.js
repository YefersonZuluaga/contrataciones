import { Form, message } from 'antd'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { db } from '../../../../firebase'

const useCreateAspirantViewModel = () => {

    const [form] = Form.useForm();
    const storage = getStorage()
    const [listaImagenes, setListaImagenes] = useState([])
    const [previewImagen, setPreviewImagen] = useState('')
    const [disableButton , setDisableButton] = useState(false)
  
  
    // handle submit
    const handleSubmit = async (cedula) => {
      const images = listaImagenes.map((file) => file.originFileObj)
      console.log(images)
  
      images.map((img) => {
        const uploadPath = `usuarios/${cedula}/${img.name}` // geting the image path
  
        const storageRef = ref(storage, uploadPath) // getting the storageRef
  
        uploadBytes(storageRef, img)
          .then((snapshot) => console.log(snapshot))
          .catch((err) => console.log(err.message))
      })
      form.resetFields();
      setListaImagenes([])
      setDisableButton(false)
    }
  
    const onFinishForm = async (values) => {
        setDisableButton(true)
      try {
        const coleccionRef = collection(db, 'usuarios')
        const docRef = doc(coleccionRef, values.cedula)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          console.log('existe')
        } else {
          const docData = {
            cedula: values.cedula,
            nombre: values.nombre,
            apellido: values.apellido,
            estadoExamenes: 'pendiente'
          }
          await setDoc(doc(db, 'usuarios', values.cedula), docData).catch((e) => {
            console.log(e)
          })
          handleSubmit(values.cedula)
        }
      } catch (erro) {
        console.log(erro)
        message.warning('Ha ocurrido un error al cargar los datos.')
      }
    }
  
    const handlePreview = async (file) => {
      console.log(file.thumbUrl)
      setPreviewImagen(file.thumbUrl)
    }
    const handleChange = ({ fileList: newFileList }) => setListaImagenes(newFileList)
  
  return { handleChange , handlePreview , listaImagenes , onFinishForm , form , disableButton}
}

export default useCreateAspirantViewModel