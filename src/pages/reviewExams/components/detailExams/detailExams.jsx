import React from 'react'
import { useParams } from 'react-router-dom'

const DetailExams = () => {
  const { userId } = useParams()
  return <div>{userId}</div>
}

export default DetailExams
