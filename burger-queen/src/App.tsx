import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importa 'Routes'
import LoginPage from './components/LoginPage';
import WaiterPage from './components/WaiterPage';
import ChefPage from './components/ChefPage';

function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (userType: string) => {
    setUser(userType);
  };

  return (
    <Router>
      {/* Utiliza <Routes> para envolver tus rutas */}
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
}

export default App;



