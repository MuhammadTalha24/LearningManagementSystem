import React from 'react'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Dashboard from './pages/admin/Dashboard'
import Sidebar from './pages/admin/Sidebar'
import Courses from './pages/admin/courses/Courses'
import AddCourses from './pages/admin/courses/AddCourses'
import EditCourse from './pages/admin/courses/EditCourse'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/my-learning' element={<MyLearning />}></Route>
        <Route path='/profile' element={<Profile />} ></Route>
        <Route path='/admin' element={<Sidebar />}>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='courses' element={<Courses />}></Route>
          <Route path='courses/create' element={<AddCourses />}></Route>
          <Route path='courses/:courseId' element={<EditCourse />}></Route>
        </Route>
      </Routes>

    </>
  )
}

export default App