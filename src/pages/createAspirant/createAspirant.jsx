import { Form, Input, Upload, message } from 'antd'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { db } from '../../../firebase'
import Header from '../components/header/Header'

import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import './index.scss'

const CreateAspirant = () => {
  // const [messageApi, contextHolder] = message.useMessage();
  // const [componentDisabled, setComponentDisabled] = useState(true)
  const [urlImagen, setUrlImagen] = useState('')
  const storage = getStorage()
  const [listaImagenes, setListaImagenes] = useState([])
  const [previewImagen, setPreviewImagen] = useState('')

  const [img, setImg] = useState(null)
  const [imgError, setImgError] = useState(null)

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
    return
    console.log(listaImagenes[0].url)
    const uploadPath = `imagenes/${listaImagenes[0].name}` // geting the image path

    const storageRef = ref(storage, uploadPath) // getting the storageRef

    uploadBytes(storageRef, listaImagenes[0])
      .then((snapshot) => console.log(snapshot))
      .catch((err) => console.log(err.message))
  }

  const prueba = async (file) => {
    console.log(file[0])

    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, file[0])

    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, 'images/mountains.jpg')

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name // true
    mountainsRef.fullPath === mountainImagesRef.fullPath // false
  }

  const prueba2 = () => {
    const listRef = ref(storage, 'imagenes')
    const listaImagenes = []
    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.items.map((item) => {
          console.log(item)
          console.log(item.fullPath)
          listaImagenes.push(item.fullPath)
        })
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          console.log(folderRef)
          // You may call listAll() recursively on them.
        })
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log(itemRef)
        })
        // console.log(listaImagenes)
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      })
    setTimeout(() => {
      console.log(listaImagenes[0])
      getDownloadURL(ref(storage, 'imagenes/icon.png'))
        .then((url) => {
          console.log(url)
          setUrlImagen(url)
        })
        .catch((error) => {})
    }, 2000)
  }

  const handleUpload = (e) => {
    setImgError(null)
    console.log(e.file.originFileObj)
    let prueba = []
    prueba.push(e.file.originFileObj)
    setListaImagenes(prueba)

    // let selected = e.file.originFileObj;

    // if (!selected) {
    //     setImgError('Please select file');
    //     return;
    // }

    // if (!selected.type.includes('image')) {
    //     setImgError('Please select image file');
    //     return;
    // }

    // if (selected.size > 1000000) {
    //     setImgError('Please select smaller file size');
    //     return;
    // }

    // setImgError(null);
    // setImg(selected);
    // handleSubmit()
  }

  const onFinishForm = async (values) => {
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
          estadoExamenes: 'Cargados'
        }
        await setDoc(doc(db, 'usuarios', values.cedula), docData).catch((e) => {
          console.log(e)
        })
        handleSubmit(values.cedula)
      }
    } catch (erro) {
      console.log('Ha ocurrido un error al cargar los datos.')
      message.warning('ha ocurrido un error.')
    }
  }

  const handlePreview = async (file) => {
    console.log(file.thumbUrl)
    setPreviewImagen(file.thumbUrl)
  }
  const handleChange = ({ fileList: newFileList }) => setListaImagenes(newFileList)

  return (
    <>
      <div className="container-createEmployee">
        <Header />

        <div className="prueba">
          <h1>Registar Aspirante</h1>
          <div style={{ width: '80%' }}>
            <>
              <Form
                labelCol={{
                  span: 6
                }}
                // wrapperCol={{
                //   span: 14
                // }}
                onFinish={onFinishForm}
              >
                <Form.Item label="Identificacion" name="cedula">
                  <Input />
                </Form.Item>
                <Form.Item label="Nombre" name="nombre">
                  <Input />
                </Form.Item>
                <Form.Item label="Apellido" name="apellido">
                  <Input />
                </Form.Item>
                <Form.Item label="Examenes medicos" valuePropName="fileList">
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleChange}
                    onPreview={handlePreview}
                    fileList={listaImagenes}
                  >
                    <div>
                      {/* <PlusOutlined /> */}
                      <div
                        style={{
                          marginTop: 8
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
                <div className="container-button">
                  <button type="submit" className="button-register">
                    Registrar
                  </button>
                </div>
              </Form>
            </>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateAspirant
