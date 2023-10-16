import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Order {
  id: number;
  client: string;
  dataEntry: string;
  status: string;
  dateProcessed?: string | null;
}

interface WaiterProps {
  token: string; // Asegúrate de recibir el token como prop
}

export function Waiter({ token }: WaiterProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('https://burger-queen-mock-9l2y.onrender.com/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error al cargar las órdenes:', error);
      }
    }

    fetchOrders();
  }, [token]);
  return (
    <TablaOrdenMesero orders={orders} />
  );
}


export function TablaOrdenMesero({ orders }: { orders: Order[] }) {
  console.log("Datos de órdenes:", orders);
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
            {orders ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className='style2 text-center'>{order.id}</td>
                  <td className='style2 text-center'>{order.client}</td>
                  <td className='style2 text-center'>{order.dataEntry}</td>
                  <td className='style2 text-center'>{order.status}</td>
                  <td className='style2 text-center'>
                    {order.dateProcessed || "Aún no entregado"}
                  </td>
                  <td className='style2 text-center'>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Cargando órdenes...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}





// function sanitizeToken({ token }) {
//   // Reemplazar caracteres no válidos con caracteres válidos
//   return token.replace(/[^A-Za-z0-9+/]/g, '');
// }


// export function TablaOrdenMesero({ token }: { token: string }) {  
//     const [data, setData] = useState([]);
//     //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN5c3RlcnMueHl6IiwiaWF0IjoxNjk3MDQyMjI5LCJleHAiOjE2OTcwNDU4MjksInN1YiI6IjEifQ.HP0UyylL1CrWbpEZ7KWpXwlpeiVPTcCt_GWvu8I2OyU'
//     const sanitizedToken = sanitizeToken(token);
//     const encodedToken = btoa(sanitizedToken);
  
//     useEffect(() => {
//       // Realizar una solicitud GET a la API aquí
//       fetch('https://burger-queen-mock-9l2y.onrender.com/orders', {
//         method: 'GET',
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization':`Basic ${encodedToken}`,
//         },     
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setData(data); // Almacenar los datos de la API en el estado
//         })
//         .catch((error) => {
//           console.error('Error al obtener los datos de la API:', error);
//         });
//     }, []);
  
//     return (
//       <>
//         <div className='table-responsive'>
//           <table className="estilos table table-striped mx-auto">
//             <thead>
//               <tr>
//                 <th className='style text-center'>N° Orden</th>
//                 <th className='style text-center'>Cliente</th>
//                 <th className='style text-center'>Hora de pedido</th>
//                 <th className='style text-center'>Estado</th>
//                 <th className='style text-center'>Hora de entrega</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(data) &&
//                 data.map((item, index) => (
//                   <tr key={index}>
//                     <td className='style2 text-center'>{item.numeroOrden}</td>
//                     <td className='style2 text-center'>{item.cliente}</td>
//                     <td className='style2 text-center'>{item.horaPedido}</td>
//                     <td className='style2 text-center'>{item.estado}</td>
//                     <td className='style2 text-center'>{item.horaEntrega}</td>
//                     <td className='style2 text-center'>
//                       <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} />
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </>
//     );
// }