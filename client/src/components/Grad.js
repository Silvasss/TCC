import { Link } from 'react-router-dom'
import { GiDistressSignal } from 'react-icons/gi'
import { ImFlag } from "react-icons/im"

import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const Grad = ({ _id, curso, instituicao, status }) => { 
  const { setEditGrad, deleteGrad } = useAppContext()
  
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{instituicao.charAt(0)}</div>

        <div className='info'>
          <h5>{curso}</h5>

          <p>{instituicao}</p>
        </div>
      </header>

      <div className='content'>
        <div className='content-center'>

          <JobInfo icon={status === 'pendente' ? <GiDistressSignal/> : <ImFlag/>} text={status} />
        </div>

        <footer>
          <div className='actions'>
            <Link to='/add-grad' className='btn edit-btn' onClick={() => setEditGrad(_id)}>Editar</Link>

            <button type='button' className='btn delete-btn' onClick={() => deleteGrad(_id)}>Apagar</button>
          </div>
        </footer>
        
      </div>
    </Wrapper>
  )
}


export default Grad