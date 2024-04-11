import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout';
import { useNavigate } from "react-router-dom";
import { Sensores } from '../sensores/Sensores';
import { SearchSaveMeasurement } from '../sensores/SearchSaveMeasurement';
import { ContaminantesExteriores } from '../sensores/ContaminantesExteriores';

export const Dashboard = () => {

  const navigate = useNavigate();

  const decodeJWT = (token) => {

    try {
     
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);

    } catch (error) {
      
      navigate('/signin')

    }
  }

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró un token en el almacenamiento local');
      }

      const tokenExp = decodeJWT(token).exp * 1000;
      const now = Date.now();

      if (now >= tokenExp) {
        
        localStorage.removeItem('token')

        // Token expirado, redirigir a la página de inicio de sesión
        navigate('/signin');
      }

    } catch (error) {
      console.error('Error al verificar el token:', error.message);
      // Manejar el error adecuadamente
      navigate('/signin');
    }
  }, []);

  return (
    <>
      <Layout />
      <div className="h-full w-full flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
          {/* Importante el uso de "client" para poder usar el componente */}
          {/* Introducir un componente de Sensor por cada sensor que queramos captar */}
          <Sensores
            parameter="Temperature"
            id="T_gauge"
            maxValue="40"
            minValue="-10"
          />
          <Sensores
            parameter="Humidity"
            id="H_gauge"
            maxValue="100"
            minValue="10"
          />
          {/* <Sensores
                client:load
                parameter="VOC"
                id="H_gauge"
                maxValue="100"
                minValue="10"
            /> */}
          <ContaminantesExteriores
            idEstacion="arco"
            idContaminante="PM25"
          />
        </div>
        <div className="min-h-screen flex justify-center items-center">
          <SearchSaveMeasurement />
        </div>
      </div>
    </>
  )
}
