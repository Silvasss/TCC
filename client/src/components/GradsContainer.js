import { useEffect } from 'react'

import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Grad from './Grad'
import Wrapper from '../assets/wrappers/JobsContainer' 
import PageBtnContainer from './PageBtnContainer'

;
const GradsContainer = () => {
  const {getGrads, userGrads, isLoading, page, totalUserGrads, searchUser, searchUserStatus, sortUser, numOfPagesUserGrads} = useAppContext()
  
  useEffect(() => {
    getGrads()
    // eslint-disable-next-line
  }, [page, searchUser, searchUserStatus, sortUser])

  if (isLoading) {
    return <Loading center />
  }
  
  return (
    <Wrapper>
      <h5>{totalUserGrads} Minha{totalUserGrads > 1 && 's'} instituiç{totalUserGrads > 1 ? 'ões' : 'ão'} encontrada{totalUserGrads > 1 && 's'}</h5>

      <div className='jobs'>
        {userGrads.map((grad) => {
          return <Grad key={grad._id} {...grad} />
        })}
      </div>

      {numOfPagesUserGrads > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}


export default GradsContainer