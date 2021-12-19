import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import ShoeList from './ShoeList'

const PrivateRoute = () => {
    const {currentUser} = useAuth();
    //if authenticated render shoelist page else redirect to login
    return currentUser ? <ShoeList/> : <Navigate to="/login"/>
}

export default PrivateRoute
