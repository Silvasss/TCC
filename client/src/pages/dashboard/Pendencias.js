import React from 'react'

import { useAppContext } from '../../context/appContext'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import Wrapper from '../../assets/wrappers/JobsContainer' 
import EgressoPendencias from '../../components/EgressoPendencias'


const Pendencias = () => {
    const { userGrads } = useAppContext()

    let pendencias = userGrads.filter(d => d.statusInstituicao === 'pendente' || d.statusInstituicao === 'recusada')

    return (        
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Typography component="h4" variant="h6" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' }, textTransform: 'capitalize' }}>Minhas Pendências</Typography>
          
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
          </AppBar>
        </Box>

        <Wrapper>          
          <div className='jobs'>
            {pendencias.map((grad) => {
              return <EgressoPendencias key={(grad._id)} {...grad} />
            })}
          </div>
        </Wrapper>

      </>      
    )
}


export default Pendencias