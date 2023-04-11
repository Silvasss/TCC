import React, { useState } from 'react'
import { FaAlignLeft } from 'react-icons/fa'

import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import Badge from '@mui/material/Badge'
import PendingActionsIcon from '@mui/icons-material/PendingActions'


const Navbar = () => {
  const { toggleSidebar, logoutUser, user, stats } = useAppContext()

  const [anchorEl, setAnchorEl] = useState(null)

  let semSolicitacoes = false

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  
  if (stats.pending > 0 && stats.declined > 0) {
    semSolicitacoes = true
  }
  

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}><FaAlignLeft /></button>

        <div>
          <Logo />
        </div>

        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} >
              <Avatar sx={{ width: 32, height: 32 } }>{user?.name.charAt(0)}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
          
          {
            (!semSolicitacoes && (stats.pending + stats.declined) > 0) &&
            <MenuItem onClick={handleClose}>            
              <Badge color="secondary" badgeContent={stats.pending + stats.declined} anchorOrigin={{ vertical: 'top', horizontal: 'left'}}>
                <PendingActionsIcon sx={{ color: '#ff9800' }}/> Pendências
              </Badge>
            </MenuItem>
          }             

          {
            (!semSolicitacoes) &&
            <Divider />
          }

          <MenuItem onClick={logoutUser}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>    
        
      </div>
    </Wrapper>
  )
}


export default Navbar