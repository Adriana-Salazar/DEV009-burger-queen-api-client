import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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