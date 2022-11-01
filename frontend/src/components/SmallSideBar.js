import React from 'react'
import { FaTimes } from 'react-icons/fa'

import Wrapper from '../assets/wrappers/SmallSidebar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'


const SmallSideBar = () => {
  const {showSidebar, toggleSideBar } = useAppContext()

  return (
    <Wrapper>
        <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>

          <div className='content'>
            <button type='button' className='close-btn' onClick={toggleSideBar}>
              <FaTimes/>
            </button>

            <header>
              <Logo/>
            </header>

            <NavLinks toggleSideBar={toggleSideBar}/>

          </div>
        </div>
    </Wrapper>
  )
}

export default SmallSideBar