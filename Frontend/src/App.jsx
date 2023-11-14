import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Footer } from './Components/Includes/Footer'
import { NavBar } from './Components/Includes/NavBar'
import { About } from './Components/Pages/About'
import { Contact } from './Components/Pages/Contact'
import { Dashboard } from './Components/Pages/Dashboard'
import { Home } from './Components/Pages/Home'
import { Login } from './Components/Pages/Login'
import { NoPage } from './Components/Includes/NoPage'
import { Signup } from './Components/Pages/Signup'
import { UserProfile } from './Components/Pages/UserProfile'
import { Tasks } from './Components/Pages/Tasks'
import { VerificationAlert } from './Components/Includes/VerificationAlert'
import './App.css'
import { Verification } from './Components/Pages/Verification'
// import { Task } from './Components/Pages/Task'

export const App = () => {

  const navigate = useNavigate();
  let initialUserInfo = localStorage.getItem("userInfo");
  if (initialUserInfo === 'undefined') initialUserInfo = "{}";
  const [userInfo, setInfo] = useState(JSON.parse(initialUserInfo));

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo])

  const logOut = () => {
    setInfo(() => { });
    navigate("/");
  }
  return (
    <>
      <Container fluid={"true"}>
        <NavBar userInfo={userInfo} logOut={logOut} />
        {
          userInfo && userInfo.verified === false && <VerificationAlert userData={userInfo}/>
        }
        <Routes>
          {["/", "/home"].map((path, i) => {
            return <Route path={path} element={<Home />} key={i} />
          })}
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login setInfo={setInfo} />} />
          <Route path='/signup' element={<Signup setInfo={setInfo} />} />
          <Route path='/dashboard'
            element={<Dashboard userData={userInfo} />}
          />
          <Route path='/profile' element={<UserProfile profilePage={true} userData={userInfo} setInfo={setInfo} />} />
          <Route path='/:id' element={<UserProfile userData={userInfo} setInfo={setInfo} />} />
          <Route path='/:id/tasks' element={<Tasks userData={userInfo} setUserData={setInfo}  />} />
          <Route path='/tasks' element={<Tasks tasksPage={true} userData={userInfo} setUserData={setInfo} />} />
          <Route path='/:userid/verify/:token' element={<Verification userData={userInfo} setUserData={setInfo}/>} />
          <Route path='/verify/:userid' element={<Verification userData={userInfo} setUserData={setInfo}/>} />
          <Route path='*' element={<NoPage />} />
        </Routes>
        <Footer />
      </Container>
    </>
  )
}