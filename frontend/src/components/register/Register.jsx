import React, { useState } from 'react';
import Layout from '../../layouts/Layout';

export const Register = () => {

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {

      console.log(formData);

      const response = await fetch(`${backend_url}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Si el registro es exitoso, puedes redirigir al usuario a la página de inicio de sesión
        alert('Registro exitoso!!');
        resetForm();
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-center text-gray-900">
              Register
            </h1>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Already have an account?{' '}
              <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>
          <form onSubmit={handleRegister} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
