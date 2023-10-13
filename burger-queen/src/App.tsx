import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import WaiterPage from './components/WaiterPage';
import ChefPage from './components/ChefPage';
import Error404 from './components/Error404';
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





