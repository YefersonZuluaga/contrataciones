import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../pages/components/notFound/notFound'
import CreateAspirant from '../pages/createAspirant/createAspirant'
import FormAspirant from '../pages/formAspirant/formAspirant'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import DetailExams from '../pages/reviewExams/components/detailExams/detailExams'
import ReviewExams from '../pages/reviewExams/reviewExams'
import PrivateRoute from './privateRoute'

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/review" element={<ReviewExams />} />
          <Route exact path="/create-aspirant" element={<CreateAspirant />} />
          <Route exact path="/form-aspirant/:userId" element={<FormAspirant />} />
          <Route exact path="/detail-exams/:userId" element={<DetailExams />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
