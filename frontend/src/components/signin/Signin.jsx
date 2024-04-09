import React, { useState } from 'react'
import Layout from '../../layouts/Layout';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    // const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    };

    // const handleSignIn = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const { data, error } = await supabase.auth.signInWithPassword({
    //             email: email,
    //             password: password,
    //         });

    //         console.log(data);

    //         if (data.session != null) {
    //             navigate('/dashboard')
    //         }

    //     } catch (error) {
    //         console.error('No se ha podido iniciar sesión correctamente');
    //     }


    // };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${backend_url}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Si el registro es exitoso, puedes redirigir al usuario a la página de inicio de sesión
                alert('Login exitoso!!');

                localStorage.setItem('token', data.token)

                navigate('/dashboard')

            } else {
                console.error('No se ha podido registrar correctamente:', data);
            }
        } catch (error) {
            console.error('No se ha podido registrar correctamente:', error);
        }

    };

    return (
        <>
            <Layout />
            {/* <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-4">Sign in</h1>
                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700"
                            >Email</label
                            >
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="p-1 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700"
                            >Password</label
                            >
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="p-1 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >Sign in</button
                        >
                    </form>
                </div>
            </div> */}

            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-4">Sign in</h1>
                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700"
                            >Email</label
                            >
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="p-1 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700"
                            >Password</label
                            >
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="p-1 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >Sign in</button
                        >
                    </form>
                </div>
            </div>
        </>
    )
}
