import React, { useEffect, useState } from 'react';

export const ContaminantesExteriores = ({ idEstacion, idContaminante }) => {
    const [data, setData] = useState([]);

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${backend_url}/api/auth/datos-contaminantes?idEstacion=${idEstacion}&idContaminante=${idContaminante}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json(); // Leer la respuesta como JSON
            console.log(jsonData.dataProvider);
            setData(jsonData);

        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Datos de contaminantes exteriores:</h2>
            <pre>{data}</pre>
        </div>
    );
};
