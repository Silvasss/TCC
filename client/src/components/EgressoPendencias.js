import React, { useState } from 'react'

import { FaPhoenixFramework } from 'react-icons/fa' 

import { useAppContext } from '../context/appContext'

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography' 


const EgressoPendencias = ({_id, curso, instituicao, emAnalisePendencia, statusInstituicao, justificativaUsuario, motivoInstituicao }) => {   
  const { updateGradPendencia, fecharModalJustificativa } = useAppContext()

  const [open, setOpen] = useState(false)

  const [motivo, setMotivo] = useState('')

  const [idJustificativa, setIdJustificativa] = useState()

  const [botaoJustificativa, setBotaoJustificativa] = useState(false)

  const handleClickOpen = (e) => {
    setIdJustificativa(e)

    setOpen(true)
  }

  const handleClose = () => {
    updateGradPendencia({id: idJustificativa, textoMotivo: motivo})

    setOpen(fecharModalJustificativa)
  }

  const botao = () => {
    if (statusInstituicao === 'recusada' && !emAnalisePendencia) {    
      if(!botaoJustificativa) {setBotaoJustificativa(true)}

      return <Chip color="error" variant="outlined" icon={<ChangeHistoryIcon />} label="Solicitação recusada pela instituição" />
    }

    return <Chip color="primary" variant="outlined" icon={<FaceIcon />} label="Em análise pela instituição" />
  }


  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{instituicao.charAt(0)}</div>

        <div className='info'>
          <h5>{instituicao}</h5>

          {statusInstituicao === "pendente" ? <p>{statusInstituicao}</p> : 
            emAnalisePendencia ? <p>Justificativa pendente</p> : botao()
          }
        </div>
      </header>

      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaPhoenixFramework />} text={curso} />     
          
          {botaoJustificativa ? <Button size="small" color="secondary" variant="outlined" onClick={() => handleClickOpen(_id)}>Contestar</Button> : 
            emAnalisePendencia ? <Chip color="warning" variant="outlined" onClick={() => setOpen(true)} icon={<FaceIcon />} label="Justificativa em análise pela instituição" /> :
              <Chip color="primary" variant="outlined" icon={<FaceIcon />} label="Em análise pela instituição" />
          }
        </div>        
      </div>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Justificativa</DialogTitle>

        { !emAnalisePendencia ? 
          <>
            <DialogContent>
              <Typography variant="h8" sx={{fontWeight: 'bold'}}> Motivo da instituição: {motivoInstituicao} </Typography>

              <DialogContentText sx={{ whiteSpace: "pre-wrap" }}>Escreva a razão da contestação da decisão da instituição de ensino. Enviaremos atualizações ocasionalmente.</DialogContentText>

              <TextField required autoFocus margin="dense" id="outlined-multiline-flexible" label="Explicação" type="text" fullWidth variant="standard" multiline onChange={(e) => setMotivo(e.target.value)}/>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>

              <Button disabled={motivo.length > 10 ? false : true} onClick={() => handleClose()}>Eviar</Button>
            </DialogActions>
          </>
          :
          <>
            <DialogContent>
              <Typography variant="h8" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' }, textTransform: 'capitalize' }}>
                Sua justificativa: {justificativaUsuario }
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpen(false)}>Fechar</Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </Wrapper>
  )
}


export default EgressoPendencias