import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Pages/LoginPage';
import WaiterPage from './Pages/WaiterPage';
import ChefPage from './Pages/ChefPage';
import Error404 from './Pages/Error404';
import OrderPage from './Pages/OrderPage';

//import AdminPage from './components/AdminPage';
import './App.css'

function App() {
  return (
    (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/waiter" element={<WaiterPage />} />
          <Route path="/chef" element={<ChefPage />} />
          <Route path="/order" element={<OrderPage />} />
          {/**si pone cualquier ruta que no es nos manda directamente a la pagina de nuestro error 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    )
  );
}

export default App;













/*function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (userType: string) => {
    setUser(userType);
  };

  return (
    <Router>      
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to={`/${user}`} /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route path="/waiter" element={<WaiterPage />} />
        <Route path="/chef" element={<ChefPage />} />
      </Routes>
    </Router>
  );
}*/





