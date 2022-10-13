import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'


const Error = () => {
    return( 
        <Wrapper className='full-page'>
            <div>
                <img src={img} alt='not found'/>

                <h3>Ei! página não encontrada</h3>

                <p>A URL solicitada não foi encontrada neste servidor.</p>

                <Link to='/'>Página inicial</Link>

            </div>
        </Wrapper>
    )
}

export default Error