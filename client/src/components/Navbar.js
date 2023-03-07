import { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaBug } from 'react-icons/fa'
import { GiAxeInStump } from "react-icons/gi"

import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import StatItem from './StatItem'


const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)

  const { toggleSidebar, logoutUser, user, stats } = useAppContext()

  const defaultStats = [
    {
      title: 'solicitações pendentes',
      count: stats.pending || 0,
      icon: <GiAxeInStump />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'solicitações recusadas',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}><FaAlignLeft /></button>

        <div>
          <Logo />

        </div>

        {
          // Adicionar aqui um icone para mostrar as solicitações pendentes para aprovação das instituições
          // Código com o posicionamento errado!
          defaultStats.map((item, index) => {
            return <StatItem key={index} {...item} />
          })
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