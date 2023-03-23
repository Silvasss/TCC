import { Link } from 'react-router-dom'

import { FaPhoenixFramework } from 'react-icons/fa' 
import { GiDistressSignal } from 'react-icons/gi'
import { ImFlag } from "react-icons/im"

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import { useAppContext } from '../context/appContext'


const Egresso = ({createdBy, nomeEgresso, curso, instituicao, status }) => {   
  const { showProfileEgresso } = useAppContext()


  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{nomeEgresso.charAt(0)}</div>

        <div className='info'>
          <h5>{nomeEgresso}</h5>

          <p>{instituicao}</p>
        </div>
      </header>

      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={status === 'pendente' ? <GiDistressSignal/> : <ImFlag/>} text={status} />

          <JobInfo icon={<FaPhoenixFramework />} text={curso} />      

        </div>        
        <Link to='/egresso' className='btn verPerfil-btn' onClick={() => showProfileEgresso(createdBy)}>Visualizar perfil</Link>
      </div>
      
    </Wrapper>
  )
}


export default Egresso