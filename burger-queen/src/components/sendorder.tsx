export async function enviarOrdenALaAPI(token, userId, client, selectedProducts, cantidadProductos, total, orderCounter, setOrderCounter, setUserId) {
    // Crear los datos de la orden
    const orderData = {
      userId, // Utiliza el userId actual
      client,
      products: selectedProducts.map((product) => ({
        qty: cantidadProductos[product.id],
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      })),
      status: 'pending',
      dateEntry: new Date().toISOString(),
      total, // Agregamos el total de la orden.
    };
  
    try {
      // Enviar la orden a la API
      const response = await fetch('https://burger-queen-mock-9l2y.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
  
      const data = await response.json();
      console.log('Orden creada:', data);
      // Realiza acciones adicionales si es necesario, como limpiar el carrito de productos.
  
      // Actualizamos el contador y el userId para el siguiente pedido
      setOrderCounter(orderCounter + 1);
      setUserId(orderCounter + 1);
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  }
  