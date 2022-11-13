import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaPhoenixFramework } from 'react-icons/fa' 
import { ImFlag } from "react-icons/im";
import moment from 'moment'

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const Egresso = ({nomeEgresso, curso, instituicao, gradLocation, gradType, createdAt, status }) => { 
  let date = moment(createdAt)

  date = date.format('DD MMM YYYY')

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

          <JobInfo icon={<FaCalendarAlt />} text={date} />

          <JobInfo icon={<FaBriefcase />} text={gradType} />

          <JobInfo icon={<ImFlag />} text={status} />

          <JobInfo icon={<FaPhoenixFramework />} text={nomeEgresso ? nomeEgresso : 'nome desconhecido'} />          
        </div>        
      </div>
    </Wrapper>
  )
}


export default Egresso