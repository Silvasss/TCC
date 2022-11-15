import { Link } from 'react-router-dom'
import { FaLocationArrow, FaBriefcase } from 'react-icons/fa'
import { GiDistressSignal } from 'react-icons/gi'
import { BsCalendarDate, BsCalendar2DateFill } from 'react-icons/bs'
import { ImFlag } from "react-icons/im"

import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const Grad = ({_id, curso, instituicao, gradLocation, gradType, status, dataInicioGraduacao, dataFimGraduacao}) => { 
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
          <JobInfo icon={<FaLocationArrow />} text={gradLocation} />
    
          <JobInfo icon={<BsCalendarDate />} text={dataInicioGraduacao.length === 10 || ' ' ? 'data não informada' : dataFimGraduacao} />

          <JobInfo icon={<FaBriefcase />} text={gradType} />
          
          <JobInfo icon={<BsCalendar2DateFill />} text={dataFimGraduacao.length === 10 || ' '? 'data não informada' : dataFimGraduacao} />

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