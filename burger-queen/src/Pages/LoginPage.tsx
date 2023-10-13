import '../App.css';
import { BackgroundImage,  } from '../components/common';
import { Login } from '../components/login'

function MyApp() {
  const handleLogin = () => { 
  };

  return (
    <div>
      <BackgroundImage />
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default MyApp;

