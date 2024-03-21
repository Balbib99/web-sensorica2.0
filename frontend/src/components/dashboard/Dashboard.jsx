import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout';
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { Sensores } from '../sensores/Sensores';

export const Dashboard = () => {

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {

      try {
        // Creamos una sesión si el usuario está logueado
        const currentSession = supabase.auth.getSession();
        console.log(currentSession);

        if ((await currentSession).data.session == null) {

          navigate('/signin')
        
        }

      } catch (error) {

      }
    };

    checkLoggedIn();
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
        </div>
        {/* <div class="min-h-screen flex justify-center items-center">
            <SearchSaveMeasurement/>
        </div> */}
    </div>
    </>
  )
}
