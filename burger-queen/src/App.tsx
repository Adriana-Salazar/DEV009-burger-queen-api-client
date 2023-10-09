import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import WaiterPage from './components/WaiterPage';
import ChefPage from './components/ChefPage';
//import AdminPage from './components/AdminPage';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userType) => {
    setUser(userType);
  };

  return (
    <Router>
      <div>
        <Route path="/" exact>
          {user ? <Redirect to={`/${user}`} /> : <LoginPage onLogin={handleLogin} />}
        </Route>
        <Route path="/waiter" component={WaiterPage} />
        <Route path="/chef" component={ChefPage} />        
      </div>
    </Router>
  );
}

export default App;

