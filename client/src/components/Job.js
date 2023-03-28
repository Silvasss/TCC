import { Link } from 'react-router-dom'
import { FaLocationArrow, FaBriefcase } from 'react-icons/fa'
import { TbCurrentLocation } from 'react-icons/tb'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const Job = ({_id, position, company, jobLocation, jobType, status, }) => { 
  const { setEditJob, deleteJob } = useAppContext()

  const submit = (_id) => {
    confirmAlert({
      title: `Deseja excluir?`,
      message: `A experiência profissional em ${company} como ${position}. Tem certeza de que deseja excluir isso?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => deleteJob(_id)
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
        <div className='main-icon'>{company.charAt(0)}</div>

        <div className='info'>
          <h5>{position}</h5>

          <p>{company}</p>
        </div>
      </header>

      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />

          <JobInfo icon={<FaBriefcase />} text={jobType} />

          <JobInfo icon={<TbCurrentLocation />} text={status} />
        </div>

        <footer>
          <div className='actions'>
            <Link to='/add-job' className='btn edit-btn' onClick={() => setEditJob(_id)}>Editar</Link>

            <button type='button' className='btn delete-btn' onClick={() => submit(_id)}>Apagar</button>
          </div>
        </footer>
        
      </div>
    </Wrapper>
  )
}


export default Job