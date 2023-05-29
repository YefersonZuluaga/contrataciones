import { Form, message } from 'antd'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { db } from '../../../../firebase'

const useCreateAspirantViewModel = () => {

  const [form] = Form.useForm();
  const storage = getStorage()
  const [listaImagenes, setListaImagenes] = useState([])
  const [previewImagen, setPreviewImagen] = useState('')
  const [disableButton, setDisableButton] = useState(false)
  const [photoProfile, setPhotoProfile] = useState()


  // handle submit
  const handleSubmit = async (cedula) => {
    const images = listaImagenes.map((file) => file.originFileObj)
    console.log(images)

    images.map((img) => {
      const uploadPath = `usuarios/${cedula}/examenes/${img.name}` // geting the image path

      const storageRef = ref(storage, uploadPath) // getting the storageRef

      uploadBytes(storageRef, img)
        .then((snapshot) => console.log(snapshot))
        .catch((err) => console.log(err.message))
    })

    let img = photoProfile[0].originFileObj
    const uploadPath = `usuarios/${cedula}/perfil/${img.name}` // geting the image path

    const storageRef = ref(storage, uploadPath) // getting the storageRef

    uploadBytes(storageRef, img)
      .then((snapshot) => console.log(snapshot))
      .catch((err) => console.log(err.message))

    message.success("Aspirante creado exitosamente")
    form.resetFields();
    setListaImagenes([])
    setDisableButton(false)
    setPhotoProfile([])
  }

  const onFinishForm = async (values) => {

    if (!(/^[0-9]+$/.test(values.cedula))) {
      message.warning('La identificacion debe ser numerica.')
      form.setFieldValue('cedula', '')
      return
    }
    if (listaImagenes.length == 0) {
      message.warning('Por favor subir examenes medicos.')
      return
    }
    if (photoProfile == undefined || photoProfile.length == 0) {
      message.warning('Por favor subir una foto de perfil.')
      return
    }

    message.info("Cargando...")
    setDisableButton(true)
    try {
      const coleccionRef = collection(db, 'usuarios')
      const docRef = doc(coleccionRef, values.cedula)
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        console.log('existe')
        message.warning("Cedula ya registrada.")
        setDisableButton(false)
      } else {
        const docData = {
          cedula: values.cedula,
          nombre: values.nombre,
          apellido: values.apellido,
          estadoExamenes: 'pendiente',
          registroFormulario: false
        }
        await setDoc(doc(db, 'usuarios', values.cedula), docData).catch((e) => {
          console.log(e)
        })
        handleSubmit(values.cedula).catch((error) => console.log(error))
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
  const handleChangePhotoProfile = ({ fileList: newFileList }) => setPhotoProfile(newFileList)

  return { handleChange, handlePreview, listaImagenes, onFinishForm, form, disableButton, photoProfile, handleChangePhotoProfile }
}

export default useCreateAspirantViewModel