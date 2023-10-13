import '../App.css'
import { Profile, TablaOrdenCocinero } from './common'



function ChefPage({token}) {
  
  return (
    <div>
      <Profile />
      <TablaOrdenCocinero />
      {token}
    </div>
  );
}

export default ChefPage;