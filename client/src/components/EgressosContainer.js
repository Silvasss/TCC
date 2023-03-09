import { useEffect } from 'react'

import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Egresso from './Egresso'
import Wrapper from '../assets/wrappers/JobsContainer' 
import PageBtnContainer from './PageBtnContainer'


const EgressosContainer = () => {
  const {getEgressos, allGrads, isLoading, page, totalAllGrads, search, searchStatus, sort, numOfPages} = useAppContext()

  useEffect(() => {
    getEgressos()
    // eslint-disable-next-line
  }, [page, search, searchStatus, sort])
  
  if (isLoading) {
    return <Loading center />
  }
  
  return (
    <Wrapper>
      <h5>{totalAllGrads} egressos{totalAllGrads > 1 && 's'} encontrados</h5>

      <div className='jobs'>
        {allGrads.map((grad) => {
          return <Egresso key={(grad._id)} {...grad} />
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}


export default EgressosContainer