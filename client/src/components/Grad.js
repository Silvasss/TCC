import { Link } from 'react-router-dom'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import moment from 'moment'

import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const Grad = ({_id, curso, instituicao, gradLocation, gradType, createdAt, status, }) => { 
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