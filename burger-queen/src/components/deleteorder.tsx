

export const deleteOrden = async (orderId: number, token: string) => {
  try {
    const response = await fetch(`https://burger-queen-mock-9l2y.onrender.com/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("La solicitud DELETE no fue exitosa");
    }

    // Aquí puedes manejar la eliminación con éxito, por ejemplo, actualizando la lista de órdenes
    // Si estás usando React, podrías usar setOrders para actualizar la lista de órdenes
    // Luego, puedes volver a cargar las órdenes si es necesario.

  } catch (error) {
    console.error("Error al eliminar la orden:", error);
  }
};
