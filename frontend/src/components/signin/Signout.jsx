import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Signout = () => {

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token')) {

            //Eliminamos el token para no poder volver a entrar
            localStorage.removeItem('token')

            //Redirigimos a la pagina de login
            navigate('/signin')
        }

    }, []);

    return null; // Devolver null ya que este componente no renderiza nada
}
