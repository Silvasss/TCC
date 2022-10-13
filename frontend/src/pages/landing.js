import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>

        <div className='container page'>
            <div className='info'>
                <h1>
                    Rastreando <span>novos</span> caminhos
                </h1>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum quam ultrices, facilisis turpis vitae, efficitur libero. Sed in dui felis. Vivamus blandit felis id metus efficitur aliquam. Ut pellentesque massa vel sapien finibus tristique. Nulla congue vitae neque non scelerisque. Aenean auctor mi in leo posuere, eget lacinia odio semper. Pellentesque varius, orci vitae cursus posuere, est lacus blandit tortor, sit amet dictum sapien mi non elit. Fusce at ullamcorper augue.
                </p>

                <Link to='/register' className='btn btn-hero'>Login/Register</Link>

                <img src={main} alt='job hunter' className='img main-img'/>
            </div>
        </div>
        

    </Wrapper>
  )
}




export default Landing