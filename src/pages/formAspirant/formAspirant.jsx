import { Form, Image, Input, Spin } from 'antd'
import React from 'react'
import Header from '../components/header/Header'
import './styles.scss'
import useFormAspirantViewModel from './viewModel/formAspirant.ViewModel'

const FormAspirant = () => {
  const {
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
  } = useFormAspirantViewModel()
  return (
    <div className="container-formAspirant">
      <Header redirect={true} />
      <div className="prueba">
        <div className="container">
          {loading ? (
            <>
              <Image width={150} className="profile" preview={false} src={photoProfile} />
              <p>{`${userData && userData.nombre} ${userData && userData.apellido}`}</p>
            </>
          ) : (
            <Spin />
          )}
        </div>
        <div className="container-card">
          <h1>Datos Aspirante</h1>
          <h3>Identificacion{` ${userData && userData.cedula}`}</h3>
          <Form
            form={form}
            labelCol={{
              span: 6
            }}
            onFinish={() => {}}
          >
            <Form.Item label="Cedula" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Nombre" name="nombre">
              <Input />
            </Form.Item>
            <Form.Item label="Apellidos" name="apellidos">
              <Input />
            </Form.Item>
            <Form.Item label="Telefono" name="telefono">
              <Input />
            </Form.Item>
            <Form.Item label="Direccion" name="direccion">
              <Input />
            </Form.Item>
            <Form.Item label="Ciudad" name="ciudad">
              <Input />
            </Form.Item>
            <Form.Item label="Fecha de nacimientos" name="fechaNacimiento">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="RH" name="rh">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <Form.Item label="Identificacion" name="cedula">
              <Input />
            </Form.Item>
            <button type="submit" className="button-register">
              Registrar
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormAspirant
