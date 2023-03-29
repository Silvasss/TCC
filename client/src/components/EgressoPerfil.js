import { GiDistressSignal } from 'react-icons/gi'
import { ImFlag } from "react-icons/im"
import { FaPhoenixFramework } from 'react-icons/fa'
import { BsCalendarDate, BsCalendar2DateFill } from 'react-icons/bs'

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import MapGoogle from './MapaGoogle'


const EgressoPerfil = ({ curso, instituicao, status, dataInicioGraduacao, dataFimGraduacao }) => {
  
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
          <JobInfo icon={status === 'pendente' ? <GiDistressSignal /> : <ImFlag />} text={status} />

          <JobInfo icon={<FaPhoenixFramework />} text={curso} />

          <JobInfo icon={<BsCalendarDate />} text={dataInicioGraduacao.length !== 10 ? 'data não informada' : dataInicioGraduacao} />

          <JobInfo icon={<BsCalendar2DateFill />} text={dataFimGraduacao.length !== 10 ? 'data não informada' : dataFimGraduacao} />
        </div>
      </div>
      
      <MapGoogle nomeInstituicao={instituicao}/>
      
    </Wrapper>
  )
}


export default EgressoPerfil