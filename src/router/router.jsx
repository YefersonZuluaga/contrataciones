import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateAspirant from '../pages/createAspirant/createAspirant'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import NotFound from '../pages/notFound/notFound'
import DetailExams from '../pages/reviewExams/components/detailExams/detailExams'
import ReviewExams from '../pages/reviewExams/reviewExams'
import PrivateRoute from './privateRoute'

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/review" element={<ReviewExams />} />
          <Route exact path="/create-aspirant" element={<CreateAspirant />} />
          <Route exact path="/detail-exams/:userId" element={<DetailExams />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
