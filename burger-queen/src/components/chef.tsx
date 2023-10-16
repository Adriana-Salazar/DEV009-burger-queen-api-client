import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';


export function TablaOrdenCocinero() {
  return (
    <>
      <div className='table-responsive'>
        <table className=" estilos table table-striped mx-auto">
          <thead>
            <tr>
              <th className='style text-center'>N° Orden</th>
              <th className='style text-center'>Hora de <br></br>pedido</th>
              <th className='style text-center'>Estado</th>
              <th className='style text-center'>Hora de <br></br>entrega</th>
              <th className='style text-center'>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='style2 text-center'>001</th>
              <td className='style2 text-center'>7:10am</td>
              <td className='style2 text-center'>Listo</td>
              <td className='style2 text-center'>7:20am</td>
              <td className='style2 text-center'>10 minutos</td>
              <td className='style2 text-center'><FontAwesomeIcon icon={faCheck} style={{ color: "#000000", }} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}