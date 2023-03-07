import { useEffect } from 'react'

import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'


const JobsContainer = () => {
  const {getJobs, jobs, isLoading, page, search, searchStatus, searchType, sort, numOfPages,} = useAppContext()
  
  useEffect(() => {
    getJobs()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  
  if (isLoading) {
    return <Loading center />
  }

  return (
    <Wrapper>
      <h5>experiências{jobs.length > 1 && 's'} encontrados</h5>

      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}


export default JobsContainer