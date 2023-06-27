import { Link } from 'react-router-dom'

import { GiDistressSignal } from 'react-icons/gi'
import { ImFlag } from "react-icons/im"

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'


const Grad = ({ _id, curso, instituicao, statusGrad, statusInstituicao }) => { 
  const { setEditGrad, deleteGrad } = useAppContext()
  
  const submit = (_id) => {
    confirmAlert({
      title: `Deseja excluir?`,
      message: `A instituição ${instituicao} com o curso ${curso}. Tem certeza de que deseja excluir isso?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => deleteGrad(_id)
        },
        {
          label: 'Não',  
          onClick: () => {}
        }
      ]
    })
  }

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
          <JobInfo icon={statusGrad === 'pendente' ? <GiDistressSignal/> : <ImFlag/>} text={statusGrad} />     
  
          {statusInstituicao === 'recusada' ? <JobInfo icon={statusInstituicao === 'recusada' ? <ChangeHistoryIcon/> : <ImFlag/>} text={"Solicitação recusada"} /> : null}  
        </div>        

        <Link to='/add-grad' className='btn edit-btn' onClick={() => setEditGrad(_id)}>Editar</Link>

        <button type='button' className='btn delete-btn' onClick={() => submit(_id)}>Apagar</button>
      </div>
    </Wrapper>
  )
}


export default Grad