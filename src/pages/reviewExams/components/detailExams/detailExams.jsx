import { Image, Spin } from 'antd'
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
    disableTextArea,
    photoProfile,
    disabledButton
  } = useDetailExamsViewModel()

  return (
    <>
      <Header path={'/review'} redirect={true} />
      <div className="container-detailExams">
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
            <h1>Revisión Examenes Medicos</h1>
            <h3>Identificacion{` ${userData && userData.cedula}`}</h3>
            <div className="container-images">
              {loading ? exams.map((item) => <Image width={150} src={item} />) : <Spin />}
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
                  <button disabled={disabledButton} onClick={() => onFinish('aprobados')}>
                    Aprobar
                  </button>
                  <button disabled={disabledButton} onClick={() => onFinish('rechazados')}>
                    Rechazar
                  </button>
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
