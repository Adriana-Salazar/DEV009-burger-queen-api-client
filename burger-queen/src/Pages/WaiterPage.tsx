import '../App.css'
import { Profile,  } from '../components/common';
import { TablaOrdenMesero } from '../components/waiter'

function WaiterView() {
  console.log('Renderizando WaiterPage');
  return (
    <div>
      <Profile />
      <TablaOrdenMesero />
    </div>
  );
}

export default WaiterView;