import { TextLogo } from '../components/common';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { enviarOrdenALaAPI } from '../components/sendorder';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateProcessed?: string | null;
}

interface OrderProps {
  token: string;
}

export function calculateTotalWithQuantity(products: Product[], quantities: { [key: number]: number }) {
  let total = 0;
  for (const product of products) {
    total += product.price * quantities[product.id];
  }
  return total;
}

export function Order({ token }: OrderProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productAdded, setProductAdded] = useState<{ [key: number]: boolean }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [cantidadProductos, setCantidadProductos] = useState<{ [key: number]: number }>({});
  const [total, setTotal] = useState(() => calculateTotalWithQuantity(selectedProducts, cantidadProductos));
  const [client, setClient] = useState(''); // Agrega un estado para el cliente
  const [orderCounter, setOrderCounter] = useState(1);
  const [userId, setUserId] = useState(orderCounter); // Inicializamos el userId con el valor actual del contador

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
    navigateTo('/waiter', { state: { token } });
  };

  const handleEnviarOrdenClick = () => {
    enviarOrdenALaAPI(token, userId, client, selectedProducts, cantidadProductos, total, orderCounter, setOrderCounter, setUserId);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://burger-queen-mock-9l2y.onrender.com/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        const data = await response.json();
        setProducts(data);
        setCantidadProductos(
          data.reduce((accumulator: { [key: number]: number }, product: Product) => {
            return { ...accumulator, [product.id]: 1 };
          }, {})
        );

      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    }

    fetchProducts();
  }, [token]);

  const handleProductSelect = (product: Product) => {
    if (!selectedProducts.find((selectedProduct) => selectedProduct.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setProductAdded({ ...productAdded, [product.id]: true });
    }
    const updatedTotal = calculateTotalWithQuantity(selectedProducts, cantidadProductos);
    setTotal(updatedTotal);
  };

  const handleRemoveProduct = (productToRemove: Product) => {
    setSelectedProducts(selectedProducts.filter((product) => product !== productToRemove));
    setProductAdded({ ...productAdded, [productToRemove.id]: false });
    const updatedTotal = calculateTotalWithQuantity(selectedProducts, cantidadProductos);
    setTotal(updatedTotal);
  };


  const incrementarCantidad = (productId: number) => {
    setCantidadProductos((prevCantidadProductos) => {
      const updatedCantidadProductos = {
        ...prevCantidadProductos,
        [productId]: prevCantidadProductos[productId] + 1,
      };
      const updatedTotal = calculateTotalWithQuantity(selectedProducts, updatedCantidadProductos);
      setTotal(updatedTotal);
      return updatedCantidadProductos;
    });
  };

  const decrementarCantidad = (productId: number) => {
    setCantidadProductos((prevCantidadProductos) => {
      if (prevCantidadProductos[productId] > 1) {
        const updatedCantidadProductos = {
          ...prevCantidadProductos,
          [productId]: prevCantidadProductos[productId] - 1,
        };
        const updatedTotal = calculateTotalWithQuantity(selectedProducts, updatedCantidadProductos);
        setTotal(updatedTotal);
        return updatedCantidadProductos;
      }
      return prevCantidadProductos;
    });
  };

  useEffect(() => {
    const updatedTotal = calculateTotalWithQuantity(selectedProducts, cantidadProductos);
    setTotal(updatedTotal);
  }, [selectedProducts, cantidadProductos]);

  return (
    <>
      <div className='menu-container'>
        <TextLogo />
        <button className='cerrar' onClick={openModal}><b>X</b></button>
        <button className="menu1" onClick={() => setSelectedCategory('Breakfast')}>Desayuno</button>
        <button className="menu2" onClick={() => setSelectedCategory('Lunch')}>Resto del día</button>
        <button className="bebidas" onClick={() => setSelectedCategory('Beverages')}>Bebidas</button>
      </div>
      <div>
      <input
        type="text"
        className="cliente"
        placeholder="Nombre del cliente"
        required
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />
      </div>
      <div className='productos'>
        {products
          .filter((product) => (
            !selectedCategory || product.type.toLowerCase() === selectedCategory.toLowerCase()
          ))
          .map((product) => (
            <div className={`card ${productAdded[product.id] ? 'added' : ''}`} key={product.id} style={{ width: '15.5rem', alignItems: 'center' }}>
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h4 className="card-title" style={{ alignItems: 'center' }}>{product.name}</h4>
                <p className="card-text" style={{ fontSize: '1.2em', textAlign: 'center' }}>{`$${product.price}`}</p>
                <button className="btn-mandar-orden" onClick={() => handleProductSelect(product)}>Agregar a la orden</button>
              </div>
            </div>
          ))
        }
      </div>

      <div className='ordenes'>
        <div className="ordenes-productos">
          {selectedProducts.map((product) => (
            <div key={product.id} className="producto-resumen">
              <img className="img-ordenes-productos" src={product.image} alt={product.name} />
              <div className="contenedor-info-orden">
                <p className="name-product">{product.name}</p>
                <div className="masANDmenos">
                  <FontAwesomeIcon className="iconosmasymenos" icon={faMinus} style={{ color: "#000000" }} onClick={() => decrementarCantidad(product.id)} />
                  <h4 className="cantidad-productos-orden">{cantidadProductos[product.id]}</h4>
                  <FontAwesomeIcon className="iconosmasymenos" icon={faPlus} style={{ color: "#000000" }} onClick={() => incrementarCantidad(product.id)} />
                </div>
              </div>
              <div className="delete-price">
                <FontAwesomeIcon className="delete" icon={faTrash} style={{ color: "#000000" }} onClick={() => handleRemoveProduct(product)} />
                <p className="price">${product.price * cantidadProductos[product.id]}</p>
              </div>
            </div>
          ))}

        </div>
        <div className="total">
          <p>Total: ${total}</p>
        </div>
      </div>
      <button className='enviar' onClick={handleEnviarOrdenClick}>
        Enviar Orden
      </button>


      {isModalVisible && (
        <div>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <p className='text-de-X'>¿Estás seguro de que deseas cerrar la vista de órdenes?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-x" data-bs-dismiss="modal" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary btn-x" onClick={handleAccept}>
                    Aceptar
                  </button>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}