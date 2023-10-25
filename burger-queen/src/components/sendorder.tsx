interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateProcessed?: string | null;
}

export async function enviarOrdenALaAPI(
  token: string,
  userId: number,
  client: string,
  selectedProducts: Product[],
  cantidadProductos: { [key: number]: number },
  total: number,
  orderCounter: number,
  setOrderCounter: (counter: number) => void,
  setUserId: (userId: number) => void) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
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
    dataEntry: formattedDate,
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
