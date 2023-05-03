import { Form, Input, Upload, message } from 'antd'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { db } from '../../../firebase'
import Header from '../components/header/Header'

import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import './index.scss'
import useCreateAspirantViewModel from './viewModel/createAspirant.ViewModel'

const CreateAspirant = () => {

  const {handleChange , handlePreview , listaImagenes , onFinishForm , form , disableButton} =  useCreateAspirantViewModel()
 
  return (
    <>
      <div className="container-createEmployee">
        <Header path={"/home"} redirect={true} />

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
