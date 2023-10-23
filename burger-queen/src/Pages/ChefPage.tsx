import '../App.css'
import { useLocation } from 'react-router-dom';
import { Profile } from '../components/common'
import { Waiter } from '../components/waiter';


function ChefPage() {
  const location = useLocation();
  const token = location.state?.token;

  return (
    <div>
      <Profile token={token} />
      <Waiter token={token} role="chef" />
    </div>
  );
}

export default ChefPage;