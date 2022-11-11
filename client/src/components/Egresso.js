import { Link } from 'react-router-dom'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import moment from 'moment'

import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const Egresso = ({_id, curso, instituicao, gradLocation, gradType, createdAt, status, }) => { 
  const { setEditGrad, deleteGrad } = useAppContext()

  let date = moment(createdAt)

  date = date.format('MMM Do, YYYY')

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

          <div className={`status ${status}`}>{status}</div>
        </div>
        
      </div>
    </Wrapper>
  )
}


export default Egresso