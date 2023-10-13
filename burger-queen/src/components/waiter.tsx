import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function sanitizeToken({ token }) {
  // Reemplazar caracteres no válidos con caracteres válidos
  return token.replace(/[^A-Za-z0-9+/]/g, '');
}


export function TablaOrdenMesero({ token }: { token: string }) {  
    const [data, setData] = useState([]);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN5c3RlcnMueHl6IiwiaWF0IjoxNjk3MDQyMjI5LCJleHAiOjE2OTcwNDU4MjksInN1YiI6IjEifQ.HP0UyylL1CrWbpEZ7KWpXwlpeiVPTcCt_GWvu8I2OyU'
    const sanitizedToken = sanitizeToken(token);
    const encodedToken = btoa(sanitizedToken);
  
    useEffect(() => {
      // Realizar una solicitud GET a la API aquí
      fetch('https://burger-queen-mock-9l2y.onrender.com/orders', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Basic ${encodedToken}`,
        },     
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data); // Almacenar los datos de la API en el estado
        })
        .catch((error) => {
          console.error('Error al obtener los datos de la API:', error);
        });
    }, []);
  
    return (
      <>
        <div className='table-responsive'>
          <table className="estilos table table-striped mx-auto">
            <thead>
              <tr>
                <th className='style text-center'>N° Orden</th>
                <th className='style text-center'>Cliente</th>
                <th className='style text-center'>Hora de pedido</th>
                <th className='style text-center'>Estado</th>
                <th className='style text-center'>Hora de entrega</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td className='style2 text-center'>{item.numeroOrden}</td>
                    <td className='style2 text-center'>{item.cliente}</td>
                    <td className='style2 text-center'>{item.horaPedido}</td>
                    <td className='style2 text-center'>{item.estado}</td>
                    <td className='style2 text-center'>{item.horaEntrega}</td>
                    <td className='style2 text-center'>
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
}