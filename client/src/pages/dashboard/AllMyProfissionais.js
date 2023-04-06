import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { JobsContainer } from '../../components'


const AllMyProfissionais = () => {
    const navigate = useNavigate()
    
    function redirecionar() {
        navigate('/add-job')
    }

    return (    
        <>  
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>Minhas experiências profissionais</Typography>
                    
                        <Box sx={{ flexGrow: 1 }} />

                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color="secondary" sx={{ color: '#fff' }} onClick={() => redirecionar()}>adicionar Experiência profissional</Button>                                            
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box> 
        
            <JobsContainer />  
        </>
        
    )
}


export default AllMyProfissionais