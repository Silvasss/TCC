import React, { useState } from "react"

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { GradsContainer, SearchContainer } from '../../components'
import { useNavigate } from 'react-router-dom'


const AllMyGrads = () => {
    const [hidden, setHidden] = useState(true)

    const navigate = useNavigate()

    function redirecionar() {
        navigate('/add-grad')
    }

    return (    
        <>   
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>Minhas experiências acadêmicas</Typography>
                    
                        <Box sx={{ flexGrow: 1 }} />
                        
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color="secondary" sx={{ color: '#fff' }} onClick={() => setHidden(s => !s)}>Filtros</Button>                            

                            <Button variant="contained" color="secondary" sx={{ color: '#fff' }} onClick={() => redirecionar()}>adicionar Experiência Acadêmica</Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box> 
        
            {!hidden ? <SearchContainer /> : null}

            <GradsContainer />  
        </>
        
    )
}


export default AllMyGrads