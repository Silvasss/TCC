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
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


const Navbar = () => {
  const { toggleSidebar, logoutUser, user, stats, userGrads, updateGradPendencia, fecharModalJustificativa } = useAppContext()

  const [anchorEl, setAnchorEl] = useState(null)

  let semSolicitacoes = false

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  
  // --------------modal FormDialog--------------
  const [open2, setOpen] = useState(false)

  const [motivo, setMotivo] = useState('')

  const [idJustificativa, setIdJustificativa] = useState()

  const [pendenciasMenuItem, setMenuItem] = useState(false)

  const handleClickOpen = (e) => {
    setIdJustificativa(e)

    setOpen(true)
  }
  
  const handleClose2 = () => {
    updateGradPendencia({id: idJustificativa, textoMotivo: motivo})

    setOpen(fecharModalJustificativa)
  }
  // -------------------------------------------

  if ((stats.pending + stats.declined) === 0) {
    semSolicitacoes = true    
  }
  
  let pendencias = userGrads.filter(d => d.statusInstituicao === 'pendente' || d.statusInstituicao === 'recusada')
  
  const cardsPendencias = () => {
    const botao = (pd) => {
      if (pd.emAnalisePendencia) {
        return <Chip color="primary" variant="outlined" icon={<FaceIcon />} label="Em análise pela instituição" />
      }

      if (pd.statusInstituicao === 'recusada') {
        return <Chip color="error" variant="outlined" icon={<ChangeHistoryIcon />} label="Solicitação recusada pela instituição" />
      }

      return <Button size="small" color="secondary" variant="outlined" onClick={() => handleClickOpen(pd._id)}>Contestar</Button>
    }

    return pendencias.map((pd) => {
      return (
        <Card key={pd._id} sx={{ maxWidth: 345, marginBottom: 2 }}>        
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pd.instituicao}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {
                (pd.justificativaUsuario) ? 'Sua justificativa: ' + pd.justificativaUsuario : (pd.statusInstituicao) + ' em ' + pd.curso 
              }
            </Typography>
          </CardContent>
          
          <CardActions>
            {
              botao(pd)
            }
          </CardActions>
          
        </Card>
      )
    })
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}><FaAlignLeft /></button>

        <div>
          <Logo />
        </div>
      </div>

      <div className='pendencias'>        
        <Box>
          <MenuItem onClick={() => setMenuItem(true)}>            
            <Badge color="warning" badgeContent={stats.pending + stats.declined} anchorOrigin={{ vertical: 'top', horizontal: 'left'}}>
              <PendingActionsIcon sx={{ color: '#ff9800' }} /> 
            </Badge>
          </MenuItem>
        </Box>                       

        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">            
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} >
              <Avatar sx={{ width: 32, height: 32 }}>{user?.name.charAt(0)}</Avatar>
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

          <MenuItem onClick={logoutUser}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>    

        <Modal open={pendenciasMenuItem} onClose={() => setMenuItem(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Pendências
            </Typography>
            
            {cardsPendencias()}            
          </Box>
        </Modal>      
      </div>

      <Dialog open={open2} onClose={() => setOpen(false)}>
        <DialogTitle>Justificativa</DialogTitle>

        <DialogContent>
          <DialogContentText>Escreva a razão da contestação da decisão da instituição de ensino. Enviaremos atualizações ocasionalmente.</DialogContentText>

          <TextField required autoFocus margin="dense" id="outlined-multiline-flexible" label="Explicação" type="text" fullWidth variant="standard" multiline onChange={(e) => setMotivo(e.target.value)}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button disabled={motivo.length > 10 ? false : true} onClick={handleClose2}>Eviar</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  )
}


export default Navbar