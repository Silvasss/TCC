import { Link } from 'react-router-dom'

import Wrapper from '../../assets/wrappers/DashboardFormPage'

import { JobsContainer } from '../../components'


const AllMyProfissionais = () => {
    return (    
        <>    
            <Wrapper>                
                <header>
                    <div className='info'>
                        <h3>Minhas experiências profissionais</h3>   
                    </div>

                    <div className='actions'>       
                        <Link to='/add-job' className='btn edit-btn'>adicionar Experiência profissional</Link>
                    </div>
                </header>                   
            </Wrapper>
        
            <JobsContainer />  
        </>
        
    )
}


export default AllMyProfissionais