import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

// interfaces para definir la estructura de los objetos(TypeScript)
interface WaiterProps {
  token: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry?: string | null;
}

interface Order {
  id: number;
  client: string;
  dataEntry: string;
  status: string;
  dateProcessed?: string | null;
  products: { qty: number; product: Product }[];
}


export function Waiter({ token, role }: WaiterProps) {
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
    <TablaOrdenMesero orders={orders} role={role} />
  );
}

function calculateTotalForSelectedOrder(selectedOrder: Order | null) {
  if (!selectedOrder || !selectedOrder.products) {
    return 0;
  }

  return selectedOrder.products.reduce((total, product) => {
    return total + (product.product.price * product.qty);
  }, 0);
}




export function TablaOrdenMesero({ orders, role }: { orders: Order[], role: string }) {
  // utiliza el hook useState para declarar un estado local
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);



  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  console.log("Datos de órdenes:", orders);
  return (
    <>
      <div className='table-responsive'>
        <table className="estilos table table-striped mx-auto">
          <thead>
            <tr>
              <th className='style text-center'>Cliente</th>
              <th className='style text-center'>Hora de pedido</th>
              <th className='style text-center'>Estado</th>
              <th className='style text-center'>Detalle de pedido</th>
              <th className='style text-center'>Hora de entrega</th>
            </tr>
          </thead>
          <tbody>
            {orders ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className='style2 text-center'>{order.client}</td>
                  <td className='style2 text-center'>{order.dataEntry}</td>
                  <td className='style2 text-center'>{order.status}</td>
                  <td className='style2 text-center'><FontAwesomeIcon onClick={() => openModal(order)}
                    icon={faEye} style={{ color: "#8f8f8f", }} /></td>

                  <td className='style2 text-center'>
                    {order.dateProcessed || "Aún no entregado"}
                  </td>
                  <td className='style2 text-center'>
                    {role === 'waiter' ? (
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} />
                    ) : role === 'chef' ? (
                      order.status === 'pending' ? (
                        <FontAwesomeIcon icon={faClock} style={{ color: "#000000" }} />
                      ) : (
                        <FontAwesomeIcon icon={faCheck} style={{ color: "#000000" }} />
                      )
                    ) : null}
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

      {isModalVisible && selectedOrder && (
        <div>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <h4>Detalle de Pedido</h4>

                  <div className="detalle-ordenes-productos">
                    {selectedOrder.products.map((product) => (
                      <div className="detalle-producto-resumen" key={product.product.id}>
                        <img
                          className="detalle-img-ordenes-productos"
                          src={product.product.image}
                          alt="imagen"
                        />
                        <div className="detalle-contenedor-info-orden">
                          <p className="detalle-name-product">{product.product.name}</p>
                          <p className="cantidad">cantidad: {product.qty}</p>
                        </div>
                        <div className="detalle-price">
                          <p className="detalle-price-p">${product.product.price * product.qty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <p>Total: ${calculateTotalForSelectedOrder(selectedOrder)}</p>
                  <button
                    type="button"
                    className="closeModal-detalle"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}





