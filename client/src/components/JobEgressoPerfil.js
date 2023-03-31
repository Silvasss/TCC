import { FaLocationArrow, FaBriefcase } from 'react-icons/fa'
import { TbCurrentLocation } from 'react-icons/tb'

import MapGoogle from './MapaGoogle.js'

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'


const JobEgressoPerfil = ({ position, company, jobLocation, jobType, status, jobLocationLatitude, jobLocationLongitude, jobLocationEstado, jobLocationCidade}) => { 

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
        
      </div>

      <MapGoogle latitude={jobLocationLatitude} longitude={jobLocationLongitude} estado={jobLocationEstado} cidade={jobLocationCidade} pais={jobLocation}/>
    </Wrapper>
  )
}


export default JobEgressoPerfil