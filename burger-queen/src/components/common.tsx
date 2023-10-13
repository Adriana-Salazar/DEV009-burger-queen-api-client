import { useState } from 'react';
//import imgerror404 from '../img/imgerror404.png'
import "bootstrap/dist/css/bootstrap.min.css";

export function BackgroundImage() {
  return (
    <img src="https://www.nestleprofessional.com.mx/sites/default/files/styles/np_recipe_detail/public/2023-08/147020-79299-9187ee8d160862c154e7936c2c13682f.png?itok=vbCMDbq0"
      alt="imagendefondo" 
      className="imagendefondo" 
    />
  )
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




