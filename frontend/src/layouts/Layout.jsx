import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Layout(props) {

    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si la ruta actual no es "/signin"
        if (location.pathname === '/signin' || location.pathname === '/') {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [location]);

    // const handleSignOut = async () => {

    //     try {

    //         const { error } = await supabase.auth.signOut()
    //         console.log(error);

    //         // Verificar si se han recibido los datos correctamente
    //         if (error == null) {

    //             setIsLoggedIn(false);
    //             navigate('/signin');

    //         }

    //     } catch (error) {

    //         console.error('Error al desloguear usuario', error);

    //     }
    // };

    return (
        <>
            <nav className="border-b bg-white dark:bg-zinc-800 dark:border-zinc-700">
                <div className="flex items-baseline justify-end sm:justify-between p-4 max-w-screen-xl mx-auto">
                    <a href="/" className="hidden sm:block font-semibold dark:text-white">Astro</a>
                    <div>
                        <ul className="font-medium flex items-baseline gap-8">

                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to='/dashboard' className="block text-zinc-900 dark:text-gray-200">Dashboard</Link>
                                    </li>

                                    <li>
                                        <Link to='/signout' className="block text-zinc-900 dark:text-gray-200">Sign out</Link>
                                    </li>
                                </>
                            ) : (

                                <>
                                    <li>
                                        <Link to='/register' className="block text-zinc-900 dark:text-gray-200">Register</Link>
                                    </li>
                                    <li>
                                        <Link to='/signin' className="block text-zinc-900 dark:text-gray-200">Sign in</Link>
                                    </li>

                                </>

                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Layout;
