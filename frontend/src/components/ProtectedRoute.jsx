import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    let isAuthenticated;
    if(localStorage.getItem('Users')){
        isAuthenticated = true;
    }
    else isAuthenticated = false;

      if(!isAuthenticated){
        return <Navigate to={'/signup'} />
      }
      else{
        return <Outlet/>;
      }
}

export default ProtectedRoute;
