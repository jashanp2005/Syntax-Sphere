import React from 'react'
import Home from './home/Home'
import Courses from './courses/Courses'
import Signup from './components/Signup';
import Result from './components/Result';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import Quiz from './components/Quiz';
import { Navigate, Route, Routes } from 'react-router-dom'
import Learning from './components/Learning';
import Display from './components/Display';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/course' element={<Courses/>}/>
          <Route path="/quiz/:language" element={<Quiz />} />
          <Route path='/result/:language' element={<Result />} />
          <Route path='/learning/:language' element={<Learning />}></Route>
          <Route path='/scores' element={<Display />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
