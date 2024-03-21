import React, { useEffect, useState } from 'react';
import { InfluxDB } from "@influxdata/influxdb-client";
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';

export const Sensores = ({ parameter, id, maxValue, minValue }) => {

    const [dataGauge, setDataGauge] = useState([]);

    // Estado para controlar el "cargando..."
    const [loading, setLoading] = useState(true);
    const [showNoData, setShowNoData] = useState(false);

    const [showDownloadButton, setShowDownloadButton] = useState(false);

    // Variable que guarda los IDs de cada Chart.js
    var charts = {}

    // Se crea el objeto de Influx
    const queryApi = new InfluxDB({ url: process.env.REACT_APP_INFLUXDB_URL, token: process.env.REACT_APP_INFLUXDB_TOKEN }).getQueryApi(process.env.REACT_APP_INFLUXDB_ORG);

    // Se crea la query
    const fluxQuery =
        `from(bucket: "${process.env.REACT_APP_INFLUXDB_BUCKET}")
|> range(start: -30d)
|> filter(fn: (r) => r._measurement == "Sensores" and (r._field == "${parameter}") and (r.sensor_id == "4"))
|> last()`;

    // Efecto Cargando...
    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoading(prevLoading => !prevLoading);
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(fetchData, 10000);

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (dataGauge) {
                console.log(dataGauge);
                setShowNoData(true);
            }
        }, 10000); // Tiempo de espera en milisegundos (en este ejemplo, 5 segundos)

        return () => clearTimeout(timeoutId);
    }, []);

    // Se realiza la consulta con todo lo configurado a Influx
    const fetchData = async () => {

        try {

            const result = await queryApi.collectRows(fluxQuery);

            const newDataGauge = result.map(row => ({
                time: formatTime(row._time),
                field: row._field,
                value: row._value
            }));


            // Actualizar los gráficos solo si newDataGauge tiene datos
            //AÑADIR UNA FUNCIÓN POR CADA PARÁMETRO A RECOGER
            if (newDataGauge.length > 0) {
                newDataGauge.forEach(newData => {

                    updateGauge(id, `#${id}`, newData.value, maxValue, minValue);

                })

                setDataGauge(newDataGauge);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Formateo de la fecha
    const formatTime = (time) => {
        const date = new Date(time);

        // Puedes personalizar el formato según tus necesidades utilizando las funciones de formato de fecha y hora de JavaScript
        return date.toLocaleString();
    };

    const updateGauge = (chartId, selector, value, maxValue) => {

        if (typeof document !== 'undefined') {

            // var ctx = document.querySelector(selector).getContext('2d');
            // Resto del código que utiliza document aquí

            var canvas = document.querySelector(selector);

            if (!canvas) {

                console.log("Crear datos");

                var container = document.querySelector(selector + "Container");

                var canvas = document.createElement('canvas');

                canvas.id = selector.split("#")[1];
                canvas.classNameName = 'gauge';

                container.appendChild(canvas);

                var ctx = canvas.getContext('2d');

                var remainingValue = maxValue - value;

                charts[chartId] = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [value, remainingValue],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgb(173, 216, 230)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgb(211, 211, 211)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        circumference: 180,
                        rotation: 270
                    }
                });

            } else {

                console.log("Acualizar datos");

                charts[chartId].data.datasets.forEach(dataset => {
                    dataset.data[0] = value;
                    dataset.data[1] = maxValue - value;
                });

                charts[chartId].update();
            }
        }
    }

    const handleDivClick = () => {
        setShowDownloadButton(!showDownloadButton);
    };

    const handleDownload = async () => {
        const csvData = convertToCSV(dataGauge);
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(csvData.split('\n').map(row => row.split('\t')));

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${parameter}Data.xlsx`);
        document.body.appendChild(link);
        link.click();
    };

    const convertToCSV = (dataArray) => {
        // Obtener las claves de la primera fila para los encabezados
        const headers = Object.keys(dataArray[0]);
        // Crear una fila para los encabezados
        let csvData = headers.join('\t') + '\n';

        // Recorrer los datos y crear una fila para cada objeto
        dataArray.forEach(obj => {
            // Obtener los valores de cada objeto en el mismo orden que los encabezados
            const row = headers.map(key => obj[key]).join('\t');
            // Agregar la fila al conjunto de datos CSV
            csvData += row + '\n';
        });

        return csvData;
    };


    return (
        <>

            <div className='bg-white p-4 rounded-lg shadow-md' onClick={handleDivClick}>

                {/* AÑADIR UN DIV POR CADA PARÁMETRO A RECOGER */}
                <p className="ml-2 text-center font-bold">{parameter}</p>
                {dataGauge && dataGauge.length > 0 && (
                    dataGauge.map(entry => {
                        return <p key={entry.time} className="ml-2 text-center">{entry.time}</p>
                    })
                )}
                <div id={id + 'Container'} className="flex items-center justify-center">
                    {/* Se Crea el Objeto canva dinámicamente */}
                </div>
                {dataGauge && dataGauge.length > 0 ? (
                    dataGauge.map(entry => {
                        return <p key={entry.time} className="ml-2 text-center">{entry.value}</p>
                    })
                ) : (
                    <p className="ml-2 text-center flex items-center justify-center h-full">
                        {showNoData ? 'No existen datos' : loading ? 'Cargando datos' : 'Cargando datos...'}
                    </p>
                )}
                {showDownloadButton && (

                    <button className={`mt-2 mx-auto block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded slide-down ${showDownloadButton ? 'active' : ''}`} onClick={handleDownload}>Descargar CSV</button>

                )}
            </div>

        </>
    )
}
