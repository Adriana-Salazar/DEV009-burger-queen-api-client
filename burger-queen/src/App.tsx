import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  { useState } from 'react';
import LoginPage from './Pages/LoginPage';
import WaiterPage from './Pages/WaiterPage';
import ChefPage from './Pages/ChefPage';
import Error404 from './Pages/Error404';
import OrderPage from './Pages/OrderPage';

//import AdminPage from './components/AdminPage';
import './App.css'

function App() {
  const [token, setToken] = useState('hola');
  return (
    (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/waiter" element={<WaiterPage />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/chef" element={<ChefPage token={token} />} />
          <Route path="/order" element={<OrderPage/>} />
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





