import { TextLogo } from '../components/common'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Order() {
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