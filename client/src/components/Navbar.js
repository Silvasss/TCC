import { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'

import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'


const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)

  const { toggleSidebar, logoutUser, user } = useAppContext()

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}><FaAlignLeft /></button>

        <div>
          <Logo />

          {/*<h3 className='logo-text'>dashboard</h3>*/}
        </div>

        {
          // Adicionar aqui um icone para mostrar as solicitações pendentes para aprovação das instituições
        }

        <div className='btn-container'>
          <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />

            {user?.name}

            <FaCaretDown />
          </button>

          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser}>Sair</button>
          </div>

        </div>
      </div>
    </Wrapper>
  )
}


export default Navbar