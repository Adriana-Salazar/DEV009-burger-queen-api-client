import '../App.css'
import { Profile, TablaOrdenMesero } from './common';


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