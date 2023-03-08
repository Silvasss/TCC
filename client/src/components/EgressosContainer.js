import { useEffect } from 'react'

import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Egresso from './Egresso'
import Wrapper from '../assets/wrappers/JobsContainer' 
import PageBtnContainer from './PageBtnContainer'


const EgressosContainer = () => {
  const {getEgressos, grads, isLoading, page, totalGrads, search, searchStatus, searchType, sort, numOfPages} = useAppContext()
  
  useEffect(() => {
    getEgressos()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  
  if (isLoading) {
    return <Loading center />
  }

  // Remove Duplicate objects from JSON Array
  var newGrads = grads.filter((arr, index, self) => index === self.findIndex((t) => (t._id === arr._id)))
  
  // ! problema com o número "totalGrads"

  return (
    <Wrapper>
      <h5>{totalGrads} egressos{grads.length > 1 && 's'} encontrados</h5>

      <div className='jobs'>
        {newGrads.map((grad) => {
          return <Egresso key={(grad._id)} {...grad} />
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}


export default EgressosContainer