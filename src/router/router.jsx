import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateAspirant from '../pages/createAspirant/createAspirant'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import NotFound from '../pages/notFound/notFound'
import DetailExams from '../pages/reviewExams/components/detailExams/detailExams'
import ReviewExams from '../pages/reviewExams/reviewExams'

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/review" element={<ReviewExams />} />
        <Route path="/create-aspirant" element={<CreateAspirant />} />
        <Route path="/detail-exams/:userId" element={<DetailExams />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
