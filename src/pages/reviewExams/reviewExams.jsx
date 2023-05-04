import { Spin, Table } from 'antd'
import React from 'react'
import Header from '../components/header/Header'
import './styles.scss'
import useReviewExamsViewModel from './viewModel/reviewExams.ViewModel'

const ReviewExams = () => {
  const { dataUsers, columns, loading } = useReviewExamsViewModel()

  return (
    <div className="container-reviewExamns">
      <Header path={'/home'} redirect={true} />
      <div className="table">
        <h1>Lista Aspirantes</h1>
        {loading ? (
          <Spin />
        ) : (
          <Table dataSource={dataUsers} columns={columns} pagination={true} scroll={true} />
        )}
      </div>
    </div>
  )
}

export default ReviewExams
