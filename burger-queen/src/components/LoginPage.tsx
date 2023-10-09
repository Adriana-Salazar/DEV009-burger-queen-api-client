import '../App.css';
import { BackgroundImage, Login } from './common';

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

