import { Form, Input, Upload } from 'antd'
import React from 'react'
import Header from '../components/header/Header'

import './index.scss'
import useCreateAspirantViewModel from './viewModel/createAspirant.ViewModel'

const CreateAspirant = () => {
  const {
    handleChange,
    handlePreview,
    listaImagenes,
    onFinishForm,
    form,
    disableButton,
    handleChangePhotoProfile,
    photoProfile
  } = useCreateAspirantViewModel()

  return (
    <>
      <div className="container-createEmployee">
        <Header path={'/home'} redirect={true} />

        <div className="prueba">
          <h1>Registar Aspirante</h1>
          <div style={{ width: '80%' }}>
            <>
              <Form
                form={form}
                labelCol={{
                  span: 6
                }}
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
                <Form.Item label="Foto Aspirante" valuePropName="fileList">
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleChangePhotoProfile}
                    onPreview={handlePreview}
                    fileList={photoProfile}
                  >
                    {photoProfile && photoProfile.length == 1 ? null : (
                      <div>
                        <div
                          style={{
                            marginTop: 8
                          }}
                        >
                          Cargar Imagen
                        </div>
                      </div>
                    )}
                  </Upload>
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
                    {listaImagenes && listaImagenes.length >= 5 ? null : (
                      <div>
                        <div
                          style={{
                            marginTop: 8
                          }}
                        >
                          Cargar Imagen
                        </div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <div className="container-button">
                  <button type="submit" className="button-register" disabled={disableButton}>
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
