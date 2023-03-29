import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEmployee from '../pages/createEmployee/createEmployee'
import Home from '../pages/home/home'
import Login from '../pages/login/login'

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>     
        <Route path="/home" element={<Home />} />
        <Route path="/create-employee" element={<CreateEmployee/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )

}

export default MainRouter