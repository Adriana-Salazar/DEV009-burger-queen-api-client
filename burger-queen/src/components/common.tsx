import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Base64 from 'base64-js';
//import imgerror404 from '../img/imgerror404.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

export function BackgroundImage() {
  return (
    <img src="https://www.nestleprofessional.com.mx/sites/default/files/styles/np_recipe_detail/public/2023-08/147020-79299-9187ee8d160862c154e7936c2c13682f.png?itok=vbCMDbq0"
      alt="imagendefondo" 
      className="imagendefondo" 
    />
  )
}

//type OnLoginHandler = (userType: string) => void;

/*interface LoginProps {  
}*/

export function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate(); // Obtiene la instancia de navigate

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Manejando clic de inicio de sesión');

    setIsLoading(true);
    try {
      // Realizar la solicitud a un endpoint protegido
      const response = await fetch('https://burger-queen-mock-9l2y.onrender.com/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      const result = await response.json();
      console.log('Respuesta de la API:', result);
      // Verificar el rol del usuario antes de redirigirlo
      if (result.user.role) {        
        navigateTo('/' + result.user.role, { state: { token: result.accessToken } });   
      }      
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="form">
      <form onSubmit={handleClick}>
        <h2 className="restro"> My Restro </h2>
        <h1 className="burger burger2"> Burger</h1>
        <h1 className="queen"> Queen </h1>
        <div className="login">
          <label className="label"> Ingresa tu email </label>
          <input
            type="email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label"> Ingresa tu contraseña </label>
          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="ingreso" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Ingresar'}
          </button>
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

export function Profile() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  return (
    <section className="userprofile">
      <TextLogo />
      <div className={`perfil ${isMenuVisible ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="icono">
          <img
            src="https://i.pinimg.com/736x/ab/e1/aa/abe1aa8c1d9944fc14f0711051d4b833.jpg"
            alt="iconperfil"
            className="iconprofile"
          />
        </div>
        <div className="info-perfil">
          <div className="cargo">Aqui el cargo xd</div>
          <div className="name">Aqui nombre xd</div>
          <div className="irapedidos">Tomar Orden</div>
          <div className="cerrar_sesion">Cerrar Sesion</div>
        </div>
      </div>
    </section>
  );
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
        <input type="text" className="cliente" placeholder="Nombre del cliente"></input>
        <input type="text" className="num_order" placeholder='N° Orden'></input>
      </div>
      <div className='ordenes'>
        <h2 className="orden"> Resúmen de Orden </h2>
      </div>
      <div className='enviar'>Enviar Orden</div>
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

function sanitizeToken({ token }) {
  // Reemplazar caracteres no válidos con caracteres válidos
  return token.replace(/[^A-Za-z0-9+/]/g, '');
}

export function TablaOrdenMesero({ token }: { token: string }) {  
  const [data, setData] = useState([]);
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN5c3RlcnMueHl6IiwiaWF0IjoxNjk3MDQyMjI5LCJleHAiOjE2OTcwNDU4MjksInN1YiI6IjEifQ.HP0UyylL1CrWbpEZ7KWpXwlpeiVPTcCt_GWvu8I2OyU'
  const sanitizedToken = sanitizeToken(token);
  const encodedToken = btoa(sanitizedToken);

  useEffect(() => {
    // Realizar una solicitud GET a la API aquí
    fetch('https://burger-queen-mock-9l2y.onrender.com/orders', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Basic ${encodedToken}`,
      },     
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Almacenar los datos de la API en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

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
            {Array.isArray(data) &&
              data.map((item, index) => (
                <tr key={index}>
                  <td className='style2 text-center'>{item.numeroOrden}</td>
                  <td className='style2 text-center'>{item.cliente}</td>
                  <td className='style2 text-center'>{item.horaPedido}</td>
                  <td className='style2 text-center'>{item.estado}</td>
                  <td className='style2 text-center'>{item.horaEntrega}</td>
                  <td className='style2 text-center'>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function TablaOrdenCocinero() {
  return (
    <>
      <div className='table-responsive'>
        <table className=" estilos table table-striped mx-auto">
          <thead>
            <tr>
              <th className='style text-center'>N° Orden</th>
              <th className='style text-center'>Hora de <br></br>pedido</th>
              <th className='style text-center'>Estado</th>
              <th className='style text-center'>Hora de <br></br>entrega</th>
              <th className='style text-center'>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='style2 text-center'>001</th>
              <td className='style2 text-center'>7:10am</td>
              <td className='style2 text-center'>Listo</td>
              <td className='style2 text-center'>7:20am</td>
              <td className='style2 text-center'>10 minutos</td>
              <td className='style2 text-center'><FontAwesomeIcon icon={faCheck} style={{ color: "#000000", }} /></td>
            </tr>
            <tr>
              <th className='style2 text-center'>001</th>
              <td className='style2 text-center'>7:10am</td>
              <td className='style2 text-center'>Listo</td>
              <td className='style2 text-center'>7:20am</td>
              <td className='style2 text-center'>10 minutos</td>
              <td className='style2 text-center'><FontAwesomeIcon icon={faCheck} style={{ color: "#000000", }} /></td>
            </tr>
            <tr>
              <th className='style2 text-center'>001</th>
              <td className='style2 text-center'>7:10am</td>
              <td className='style2 text-center'>Pendiente</td>
              <td className='style2 text-center'>7:20am</td>
              <td className='style2 text-center'>15 minutos</td>
              <td className='style2 text-center'><FontAwesomeIcon icon={faClock} style={{ color: "#000000", }} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}