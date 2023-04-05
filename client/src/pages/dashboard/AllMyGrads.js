import React, { useState } from "react"

import Wrapper from '../../assets/wrappers/DashboardFormPage'

import { Link } from 'react-router-dom'

import { GradsContainer, SearchContainer } from '../../components'


const AllMyGrads = () => {
    const [hidden, setHidden] = useState(true)

    return (    
        <>    
            <Wrapper>                
                <header>
                    <div className='info'>
                        <h3>Minhas experiências acadêmicas</h3>   
                    </div>

                    <div className='actions'>
                        <button className='btn edit-btn' onClick={() => setHidden(s => !s)}>Filtros</button>          
                        
                        <Link to='/add-job' className='btn edit-btn'>adicionar Experiência Acadêmica</Link>
                    </div>                    
                </header>             
            </Wrapper>
        
            {!hidden ? <SearchContainer /> : null}

            <GradsContainer />  
        </>
        
    )
}


export default AllMyGrads