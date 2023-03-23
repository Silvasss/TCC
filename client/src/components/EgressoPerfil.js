import { FaPhoenixFramework } from 'react-icons/fa' 
import { GiDistressSignal } from 'react-icons/gi'
import { ImFlag } from "react-icons/im"

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const EgressoPerfil = ({ curso, instituicao, status }) => {   

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

          <JobInfo icon={<FaPhoenixFramework />} text={curso} />      
        </div>        
      </div>
      
    </Wrapper>
  )
}


export default EgressoPerfil