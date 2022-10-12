import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'


const Landing = () => {
  return (
    <main>
        <nav>
            <img src={logo} alt='Alumni' className='logo'/>
        </nav>

        <div className='container page'>
            <div className='info'>
                <h1>
                    Job <span>tracking</span> app
                </h1>
            </div>
        </div>
        

    </main>
  )
}


export default Landing