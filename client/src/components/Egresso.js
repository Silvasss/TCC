import { FaLocationArrow, FaBriefcase, FaPhoenixFramework } from 'react-icons/fa' 
import { BsCalendarDate, BsCalendar2DateFill } from 'react-icons/bs'
import { GiDistressSignal } from 'react-icons/gi'
import { ImFlag } from "react-icons/im"

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const Egresso = ({nomeEgresso, curso, instituicao, gradLocation, gradType, status, dataInicioGraduacao, dataFimGraduacao }) => { 


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
          <JobInfo icon={<FaLocationArrow />} text={gradLocation} />

          <JobInfo icon={<BsCalendarDate />} text={dataInicioGraduacao} />

          <JobInfo icon={<FaBriefcase />} text={gradType} />

          <JobInfo icon={<BsCalendar2DateFill />} text={dataFimGraduacao} />

          <JobInfo icon={status === 'pendente' ? <GiDistressSignal/> : <ImFlag/>} text={status} />

          <JobInfo icon={<FaPhoenixFramework />} text={nomeEgresso ? nomeEgresso : 'nome desconhecido'} />               
                         
        </div>        
      </div>
    </Wrapper>
  )
}


export default Egresso