import React, { useEffect, useState } from 'react';
import { menuToggle } from './funcion.js';
import imgerror404 from '../img/imgerror404.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export function BackgroundImage() {
  return (
    <img src="https://www.nestleprofessional.com.mx/sites/default/files/styles/np_recipe_detail/public/2023-08/147020-79299-9187ee8d160862c154e7936c2c13682f.png?itok=vbCMDbq0"
      alt="imagendefondo" className="imagendefondo" />
  )
}

export function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleClick() {

    if (email === '' || password === '') {
      if (email === '') {
        alert('Debes llenar el campo email');
      } else if (password === '') {
        alert('Debes llenar el campo contraseña');
      }
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Verifica el correo electrónico que has introducido.');
    } else {
      // Aquí puedes realizar la lógica para el inicio de sesión
      alert('¡Me hiciste clic!');
    }
  }


  return (
    <div className="form">
      <form>
        <h2 className="restro"> My Restro </h2>
        <h1 className="burger burger2"> Burger</h1>
        <h1 className="queen"> Queen </h1>
        <div className="login">
          <label className="label"> Ingresa tu email </label>

          <input type="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label className="label"> Ingresa tu password </label>
          <input type="password" className="password" value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
          <button className="ingreso" onClick={handleClick}> Ingresar </button>

        </div>
      </form>
    </div>
  );

}


// export function LoginForm() {
//   return (
//     <div className="form">
//       <form>
//         <h2 className="restro"> My Restro </h2>
//         <h1 className="burger burger2" > Burger</h1>
//         <h1 className="queen"> Queen </h1>
//         <div className="login">
//           <label className="label" > Ingresa tu email </label>
//           <input type="email" className="email" id='email'></input>
//           <label className="label"> Ingresa tu password </label>
//           <input type="password" className="password" id='password'></input>
//           <button className="ingreso" id='ingreso' onClick={Button}> Ingresar </button>
//         </div>
//       </form>
//     </div>
//   )
// }




export function TextLogo() {
  return (
    <>
      <div className='text'>
        <h1 className="burger2" > Burger</h1>
        <h1 className="queen2"> Queen </h1>
      </div>
    </>
  )
}

export function menuToggle() {
    const toggleMenu = document.querySelector('.info-perfil');
    toggleMenu.classList.toggle('active');
  }


export function Profile() {
  return (
    <section className="userprofile">


      <TextLogo />


      <div className="perfil" onClick={menuToggle}>

        <div className="icono">
          <img src='https://i.pinimg.com/736x/ab/e1/aa/abe1aa8c1d9944fc14f0711051d4b833.jpg' alt="iconperfil" className="iconprofile" />
        </div>

        <div className="info-perfil">
          <div className="cargo">Aqui el cargo xd</div>
          <div className="name">Aqui nombre xd</div>
          <div className="irapedidos">Tomar Orden</div>
          <div className="cerrar_sesion">Cerrar Sesion</div>
        </div>
      </div>

    </section>

  )
}

export function Order() {
  return (
    <>
      <div className='menu-container'>
        <TextLogo />
        <button className="menu1"> Desayuno </button>
        <button className="menu2"> Resto del día </button>
      </div>
      <div>
        <input type="text" className="cliente" placeholder="Nombre cliente"></input>
        <input type="text" className="numorder"></input>
      </div>
      <div>
        <h2 className="orden"> Resúmen de Orden </h2>
      </div>
    </>
  )
}



export function Error404() {
  return (
    <>
      <div className='conteinererror404'>
        <img src={imgerror404} alt="imagen_de_error" className="imgerror404" />
        <h2 className='msgerror404'>Pagina no encontrada</h2>
      </div>
    </>
  )
}

interface Order {
  id: number;
  customerName: string;
  orderdateEntry: string;
  customerStatus: string;
  // Agrega más propiedades según la estructura de tus datos
}



export function Tabla() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetch('https://burger-kg51.onrender.com')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Order[]) => setOrders(data))
      .catch(error => console.error('Error fetching data:', error));
},[]);
  return (
    <>
      <div className='table-responsive'>
        <table className=" estilos table table-striped mx-auto">
          <thead>
            <tr>
              <th className='style text-center'>N° Orden</th>
              <th className='style text-center'>Cliente</th>
              <th className='style text-center'>Hora de <br></br>pedido</th>
              <th className='style text-center'>Estado</th>              
            </tr>
          </thead>
          <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <th className='style2 text-center'>{order.id}</th>
              <td className='style2 text-center'>{order.customerName}</td>
              <td className='style2 text-center'>{order.orderdateEntry}</td>
              <td className='style2 text-center'>{order.customerStatus}</td>              
              <td className='style2 text-center'><FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} /></td>
            </tr>
          ))}              
          </tbody>
        </table>
      </div>
    </>
  )
}
