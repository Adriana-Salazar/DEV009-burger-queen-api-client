import { TextLogo } from '../components/common'

export function Order() {
    return (
      <>
        <div className='menu-container'>
          <TextLogo />
          <button className="menu1"> Desayuno </button>
          <button className="menu2"> Resto del día </button>
        </div>
        <div>
          <input type="text" className="cliente" placeholder="Nombre del cliente"></input>
          <input type="text" className="num_order" placeholder='N° Orden'></input>
        </div>
        <div className='ordenes'>
          <h2 className="orden"> Resúmen de Orden </h2>
        </div>
        <div className='enviar'>Enviar Orden</div>
      </>
    )
  }