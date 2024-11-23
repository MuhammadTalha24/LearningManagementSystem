import React from 'react'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/my-learning' element={<MyLearning />}></Route>
        <Route path='/profile' element={<Profile />} ></Route>
      </Routes>

    </>
  )
}

export default App