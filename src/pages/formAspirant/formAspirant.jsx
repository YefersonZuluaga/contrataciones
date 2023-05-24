import { Collapse, Form, Image, Input, Spin } from 'antd'
import React from 'react'
import Header from '../components/header/Header'
import './styles.scss'
import useFormAspirantViewModel from './viewModel/formAspirant.ViewModel'
const { Panel } = Collapse

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
      <Header redirect={true} path={'/review'} />
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
            className="form"
            form={form}
            labelCol={{
              span: 6
            }}
            onFinish={onFinish}
          >
            <Collapse defaultActiveKey={['1']}>
              <Panel header="Informacion Ciudadano" key="1">
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
                {/* </Panel> */}
                {/* <Panel header="This is panel header 2" key="2"> */}
                <Form.Item label="RH" name="rh">
                  <Input />
                </Form.Item>
                <Form.Item label="Cargo" name="cargo">
                  <Input />
                </Form.Item>
                <Form.Item label="Salario" name="salario">
                  <Input />
                </Form.Item>
                <Form.Item label="Nivel Educativo" name="nivelEducativo">
                  <Input />
                </Form.Item>
                <Form.Item label="Fondo Pension" name="fondoPension">
                  <Input />
                </Form.Item>
                <Form.Item label="Fondo salud" name="fondoSalud">
                  <Input />
                </Form.Item>
                <Form.Item label="Caja compensacion" name="cajaCompensacion">
                  <Input />
                </Form.Item>
                <Form.Item label="Fecha Elaboracion" name="fechaElaboracion">
                  <Input />
                </Form.Item>
                <Form.Item label="Inicio Contrato" name="inicioContrato">
                  <Input />
                </Form.Item>
              </Panel>
              <Panel header="Informacion Laboral" key="3">
                <Form.Item label="Empresa" name="empresa">
                  <Input />
                </Form.Item>
                <Form.Item label="Cargo" name="cargo">
                  <Input />
                </Form.Item>
                <Form.Item label="Salario" name="salarioExperiencia">
                  <Input />
                </Form.Item>
                <Form.Item label="Telefono" name="telefono">
                  <Input />
                </Form.Item>
                <Form.Item label="Jefe Inmediato" name="jefeInmediato">
                  <Input />
                </Form.Item>
                <Form.Item label="Motivo Retiro" name="motivoRetiro">
                  <Input />
                </Form.Item>
              </Panel>
            </Collapse>
            <div className="container-button">
              <button type="submit" className="button-register">
                {userData.registroFormulario ? 'Actualizar' : 'Registrar'}
              </button>
              {userData.registroFormulario && (
                <button className="button-register">Generar Contrato</button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormAspirant
