import { useEffect } from 'react'

import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Grad from './Grad'
import Wrapper from '../assets/wrappers/JobsContainer' 
import PageBtnContainer from './PageBtnContainer'


const GradsContainer = () => {
  const {getGrads, grads, isLoading, page, totalUserGrads, search, searchStatus, searchType, sort, numOfPages} = useAppContext()
  
  useEffect(() => {
    getGrads()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return <Loading center />
  }
  
  return (
    <Wrapper>
      <h5>{totalUserGrads} Minha{grads.length > 1 && 's'} instituiç{grads.length > 1 ? 'ões' : 'ão'} encontrada{grads.length > 1 && 's'}</h5>

      <div className='jobs'>
        {grads.map((grad) => {
          return <Grad key={grad._id} {...grad} />
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}


export default GradsContainer