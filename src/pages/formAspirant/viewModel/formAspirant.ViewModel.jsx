import { pdf } from '@react-pdf/renderer'
import { Form, Input, message } from 'antd'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../../../firebase'
import { adaptedArrayImages } from '../../../hooks/adapterArrayImages'
import MyDocument from '../../../hooks/getPdf'

const useFormAspirantViewModel = () => {
  const navigate = useNavigate()
  const rules = [
    {
      required: true,
      message: 'Campo obligatorio!'
    }
  ]
  const { TextArea } = Input
  const [form] = Form.useForm()
  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const [exams, setExans] = useState([])
  const [loading, setLoading] = useState(false)
  const [observations, setObservations] = useState('')
  const [disableTextArea, setDisableTextArea] = useState(false)
  const [photoProfile, setPhotoProfile] = useState('')
  const [disabledButton, setDisabledButton] = useState(false)
  const [centinela, setCentinela] = useState(false)
  const [keys, setKeys] = useState([])

  const [fechaElaboracion, setFechaElaboracion]= useState('')

  const obtenerDatos = async () => {
    const q = query(collection(db, 'usuarios'), where('cedula', '==', userId))

    const querySnapshot2 = await getDocs(q)
    querySnapshot2.forEach((doc) => {
      let data = doc.data()
      console.log(data)
      setUserData(doc.data())
      form.setFieldValue('nombre', data.nombre)
      form.setFieldValue('cedula', data.cedula)
      form.setFieldValue('apellidos', data.apellido)
      setKeys(['1'])
      if (data.registroFormulario) {
        setUserData(doc.data())
        form.setFieldValue('telefono', data.telefono)
        form.setFieldValue('direccion', data.direccion)
        form.setFieldValue('ciudad', data.ciudad)
        form.setFieldValue('fechaNacimiento', data.fechaNacimiento)
        form.setFieldValue('email', data.email)
        form.setFieldValue('rh', data.rh)
        form.setFieldValue('cargo', data.cargo)
        form.setFieldValue('salario', data.salario)
        form.setFieldValue('nivelEducativo', data.nivelEducativo)
        form.setFieldValue('fondoPension', data.fondoPension)
        form.setFieldValue('fondoSalud', data.fondoSalud)
        form.setFieldValue('cajaCompensacion', data.cajaCompensacion)
        // form.setFieldValue('fechaElaboracion', data.fechaElaboracion)
        // form.setFieldValue('inicioContrato', data.inicioContrato)
        form.setFieldValue('empresa', data.empresa)
        form.setFieldValue('cargo', data.cargo)
        form.setFieldValue('salarioExperiencia', data.salarioExperiencia)
        form.setFieldValue('telefonoExperiencia', data.telefonoExperiencia)
        form.setFieldValue('jefeInmediato', data.jefeInmediato)
        form.setFieldValue('motivoRetiro', data.motivoRetiro)
        form.setFieldValue('cargoExperiencia', data.cargoExperiencia)
        setKeys(['1', '2'])
      }
    })
  }

  const onFinish = async (estado) => {
    message.info('cargando...')
    setDisabledButton(true)
    console.log(estado.salarioExperiencia)
    // return
    try {
      const coleccionRef = collection(db, 'usuarios')
      const docRef = doc(coleccionRef, userData.cedula)
      const docSnapshot = await getDoc(docRef)
      if (!docSnapshot.exists()) {
      } else {
        const docData = {
          estadoExamenes: userData.estadoExamenes,
          observacionExamenes: userData.observacionExamenes,
          cedula: estado.cedula,
          nombre: estado.nombre,
          apellido: estado.apellidos,
          telefono: estado.telefono,
          direccion: estado.direccion,
          ciudad: estado.ciudad,
          fechaNacimiento: estado.fechaNacimiento,
          email: estado.email,
          rh: estado.rh,
          cargo: estado.cargo,
          salario: estado.salario,
          nivelEducativo: estado.nivelEducativo,
          fondoPension: estado.fondoPension,
          fondoSalud: estado.fondoSalud,
          cajaCompensacion: estado.cajaCompensacion,
          // fechaElaboracion: estado.fechaElaboracion,
          // inicioContrato: estado.inicioContrato,
          empresa: estado.empresa,
          salarioExperiencia: estado.salarioExperiencia,
          telefonoExperiencia: estado.telefonoExperiencia,
          jefeInmediato: estado.jefeInmediato,
          motivoRetiro: estado.motivoRetiro,
          cargoExperiencia: estado.cargoExperiencia,
          registroFormulario: true
        }
        await setDoc(doc(db, 'usuarios', userData.cedula), docData).catch((e) => {
          console.log(e)
        })
        message.success('Aspirante actualizado exitosamente.')
        setCentinela(!centinela)
        // setTimeout(() => {
        //   setDisabledButton(false)
        //   navigate("/review")
        // }, 2000);
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
      aux = adaptedArrayImages(listaImagenes)
      Promise.all(aux).then((values) => {
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
    let arrayAux = []
    setTimeout(() => {
      arrayAux = adaptedArrayImages(listaImagenes)
      Promise.all(arrayAux).then((values) => {
        setPhotoProfile(values[0])
        // setLoading(true)
      })
    }, 1000)
  }

  const createPDF = async () => {
    const blob = await pdf(
      <MyDocument
        cargo={'desarrollador jr'}
        Compañia={userData.empresa}
        fecha={'2023-12-12'}
        empleado={`${userData.nombre} ${userData.apellido}`}
      />
    ).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Contrato-${userId}.pdf`
    link.click()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.warning('Faltan campos por llenar')
  }

  const onChangeKeys = (key) => {
    console.log(key)
    setKeys(key)
    let index = keys.indexOf(key)
    // if (index == -1) {
    //   setKeys([...keys, key])
    // }
    // console.log(index)
  }
  useEffect(() => {
    obtenerDatos().catch((error) => console.log(error))
    getImages()
    getPhotoProfile()
  }, [centinela])

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
    form,
    rules,
    createPDF,
    onFinishFailed,
    onChangeKeys,
    keys,
    fechaElaboracion,
    setFechaElaboracion

  }
}

export default useFormAspirantViewModel
