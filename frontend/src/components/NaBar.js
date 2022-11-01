import React, { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'

import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'


const NaBar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const {toggleSideBar, logoutUser, user} = useAppContext()
  
  return (
    <Wrapper>
        <div className='nav-center'>
          <button className='toggle-btn' onClick={toggleSideBar}>
            <FaAlignLeft/>
          </button>

          <div>
            <Logo/>

            <h3 className='logo-text'>dashboard</h3>
          </div>

          <div className='btn-container'>
            <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
              <FaUserCircle/>{user?.name}<FaUserCircle/>
            </button>

            <div className={showLogout ? 'dropdwon show-dropdown' : 'dropdown'}>
              <button type='button' className='dropdown-btn' onClick={() => logoutUser}>
                Sair
              </button>
            </div>
          </div>          

        </div>
    </Wrapper>
  )
}

export default NaBar