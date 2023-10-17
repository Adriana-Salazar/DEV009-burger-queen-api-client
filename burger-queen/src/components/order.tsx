import { TextLogo } from '../components/common'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface OrderProps {
  token: string; // Asegúrate de recibir el token como prop
}


export function Order({ token }: OrderProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    console.log('Abriendo el modal');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateTo = useNavigate();

  const handleAccept = () => {
    closeModal();
    // Redirige a /waiter
    navigateTo('/waiter');
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://burger-queen-mock-9l2y.onrender.com/products', {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de tener el token disponible
          },
        });

        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    }

    fetchProducts();
  }, [token]);

  return (
    <>
      <div className='menu-container'>
        <TextLogo />
        <button className='cerrar' onClick={openModal}><b>X</b></button>
        <button className="menu1"> Desayuno </button>
        <button className="menu2"> Resto del día </button>
        <button className="bebidas"> Bebidas </button>
      </div>
      <div>
        <input type="text" className="cliente" placeholder="Nombre del cliente"></input>
        <input type="text" className="num_order" placeholder='N° Orden'></input>
      </div>

      <div className='productos'>
        {products ? (

          products.map((product) => (
            <div className="card" key={product.id} style={{ width: '16rem', alignItems: 'center' }}>
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h4 className="card-title" style={{ alignItems: 'center' }}>{product.name}</h4>
                <p className="card-text" style={{ fontSize: '1.2em', textAlign: 'center' }}>{`$${product.price}`}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando órdenes...</p>
        )
        }



      </div>


      <div className='ordenes'>
        <h2 className="orden"> Resúmen de Orden </h2>
      </div>
      <div className='enviar'>Enviar Orden</div>

      {/* Modal */}
      {isModalVisible && (
        <div>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  {/* Contenido de tu modal */}
                  <p className='text-de-X'>¿Estás seguro de que deseas cerrar la vista de órdenes?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-x" data-bs-dismiss="modal" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary btn-x" onClick={handleAccept}>
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}