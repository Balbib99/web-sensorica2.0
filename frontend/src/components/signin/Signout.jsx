import React, { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';

export const Signout = () => {

    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

    const navigate = useNavigate();

    useEffect(() => {
        const signOutUser = async () => {
            try {
                const { error } = await supabase.auth.signOut()
                console.log(error);

                // Verificar si se han recibido los datos correctamente
                if (error == null) {
                    navigate('/signin');
                }

            } catch (error) {
                console.error('Error al desloguear usuario', error);
            }
        };

        signOutUser(); // Llamar a la función de cierre de sesión al cargar el componente

    }, [navigate, supabase.auth]);

    return null; // Devolver null ya que este componente no renderiza nada
}
