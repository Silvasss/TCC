import { useEffect } from 'react'

import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Grad from './Grad'
import Wrapper from '../assets/wrappers/JobsContainer' 
import PageBtnContainer from './PageBtnContainer'


const GradsContainer = () => {
  const {getGrads, grads, isLoading, page, totalGrads, search, searchStatus, searchType, sort, numOfPages,} = useAppContext()
  
  useEffect(() => {
    getGrads()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return <Loading center />
  }

  if (grads.length === 0) {
    return (
      <Wrapper>
        <h2>Nada foi encontrado...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>{totalGrads} instituiçõe{grads.length > 1 && 's'} encontradas</h5>

      <div className='grads'>
        {grads.map((grad) => {
          return <Grad key={grad._id} {...grad} />
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}


export default GradsContainer