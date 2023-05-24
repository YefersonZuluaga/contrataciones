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
    form,
    rules,
    createPDF,
    onFinishFailed,
    onChangeKeys,
    keys
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
            onFinishFailed={onFinishFailed}
          >
            <Collapse onChange={onChangeKeys} activeKey={keys}>
              <Panel header="Informacion Ciudadano" key="1">
                <Form.Item label="Cedula" name="cedula" rules={rules}>
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item label="Nombre" name="nombre" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Apellidos" name="apellidos" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Telefono" name="telefono" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Direccion" name="direccion" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Ciudad" name="ciudad" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Fecha de nacimientos" name="fechaNacimiento" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input />
                </Form.Item>
                {/* </Panel> */}
                {/* <Panel header="This is panel header 2" key="2"> */}
                <Form.Item label="RH" name="rh" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Cargo" name="cargo" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Salario" name="salario" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Nivel Educativo" name="nivelEducativo" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Fondo Pension" name="fondoPension" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Fondo salud" name="fondoSalud" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Caja compensacion" name="cajaCompensacion" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Fecha Elaboracion" name="fechaElaboracion" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Inicio Contrato" name="inicioContrato" rules={rules}>
                  <Input />
                </Form.Item>
              </Panel>
              <Panel header="Informacion Laboral" key="2">
                {/* <Form.Item label="Empresa" name="empresa" rules={rules}>
                  <Input />
                </Form.Item> */}
                <Form.Item label="prueba" name="prueba" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
                <Form.Item label="Salario Experiencia" name="salarioExperiencia" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Telefono" name="telefono" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Jefe Inmediato" name="jefeInmediato" rules={rules}>
                  <Input />
                </Form.Item>
                <Form.Item label="Motivo Retiro" name="motivoRetiro" rules={rules}>
                  <Input />
                </Form.Item>
              </Panel>
            </Collapse>
            <div className="container-button">
              <button type="submit" className="button-register">
                {userData.registroFormulario ? 'Actualizar' : 'Registrar'}
              </button>
              {userData.registroFormulario && (
                <button className="button-register" onClick={createPDF}>
                  Generar Contrato
                </button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormAspirant
