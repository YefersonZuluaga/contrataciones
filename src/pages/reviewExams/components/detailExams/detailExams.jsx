import { Image } from 'antd'
import React from 'react'
import Header from '../../../components/header/Header'
import '../../styles/detailExams.scss'
import useDetailExamsViewModel from '../../viewModel/detailExams.ViewModel'

const DetailExams = () => {
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
    disableTextArea
  } = useDetailExamsViewModel()

  return (
    <>
      <Header path={'/review'} redirect={true} />
      <div className="container-detailExams">
        <div className="prueba">
          <div className="container">
            <Image
              width={150}
              className="profile"
              preview={false}
              src="https://firebasestorage.googleapis.com/v0/b/contrataci0nes.appspot.com/o/usuarios%2F1005093860%2Fdescarga.jpg?alt=media&token=5a00c079-8fbe-41eb-9338-47426d4866c8"
            />
            <p>{`${userData && userData.nombre} ${userData && userData.apellido}`}</p>
          </div>
          <div className="container-card">
            <h1>Revisión Examenes Medicos</h1>
            <h3>Identificacion{` ${userData && userData.cedula}`}</h3>
            <div className="container-images">
              {loading ? exams.map((item) => <Image width={150} src={item} />) : 'Cargando'}
            </div>
            <div className="container-textArea">
              <p>Observaciones :</p>
              <TextArea
                rows={4}
                className="textArea"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                disabled={disableTextArea}
              />
            </div>
            <div className="container-buttons">
              {userData && userData.estadoExamenes != 'pendiente' ? null : (
                <>
                  <button onClick={() => onFinish('aprobados')}>Aprobar</button>
                  <button onClick={() => onFinish('rechazados')}>Rechazar</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailExams
