import React, { useState } from 'react'
import Layout from '../../layouts/Layout';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            console.log(data);

            if (data.session != null) {
                navigate('/dashboard')
            }

        } catch (error) {
            console.error('No se ha podido iniciar sesión correctamente');
        }


    };

    return (
        <>
            <Layout />
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-4">Sign in</h1>
                    <p className="text-gray-600 mb-4">
                        New here? <a href="/register" className="text-blue-500"
                        >Create an account</a>
                    </p>
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
            </div>
        </>
    )
}
