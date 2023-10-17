import '../App.css'
import { Order } from '../components/order'
import { useLocation } from 'react-router-dom';



function Pedidos() {
  const location = useLocation();
  const token = location.state?.token;

  console.log('Token recibido en el componente Pedidos:', token);

  return (
    <div>
      <Order token={token} />
    </div>
  );
}

export default Pedidos;