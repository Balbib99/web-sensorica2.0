import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom'
import { Signin } from '../components/signin/Signin'
import { Dashboard } from '../components/dashboard/Dashboard'
import { Register } from '../components/register/Register'
import { Signout } from '../components/signin/Signout'

export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Grupo de rutas para lo público */}
                <Route path='/' element={<Signin />} />
                <Route path='signin' element={<Signin />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='register' element={<Register />} />
                <Route path='signout' element={<Signout />} />

                {/* <Route path='/social' element={<PrivateLayout />}>
                    <Route index element={<Rpc />} />
                    <Route path='rpc' element={<Rpc />} />
                    <Route path='ctu' element={<Ctu />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='file' element={<File />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    )
}