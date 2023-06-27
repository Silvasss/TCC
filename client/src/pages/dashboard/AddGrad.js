import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../../context/appContext'

import { Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'


const AddGrad = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    instituicao, //
    instituicaoOptions, //
    curso,
    statusGrad, // 
    statusGradOptions, //
    handleChange,
    clearGradValues,
    createGrad, //
    editGrad, //
    dataMesInicioGraduacao, //
    dataAnoInicioGraduacao, //
    dataMesFimGraduacao, //
    dataAnoFimGraduacao //
  } = useAppContext()

  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!curso || !instituicao ) {
      displayAlert()

      return
    }
    
    if (isEditing) {
      editGrad()

      return
    }

    createGrad()

    limpar()

    navigate('/')
  }

  const [disableDataConclusao, setDisableDataConclusao] = useState(true)

  const [cursosInstituicao, setCursosInstituicao] = useState(instituicaoOptions[0].cursos)
  
  const handleGradInput = (e) => {     
    try {
      if (e[0] === 'statusGrad' && e[1] === 'Atual') {
        setDisableDataConclusao(false)
      } 

      if (e[0] === 'statusGrad' && e[1] === 'Anterior') {
        setDisableDataConclusao(true)
      }

      const name = e[0]
    
      const value = e[1]    
      
      handleChange({ name, value })
    } catch (error) {
      if (e[0] === 'instituicao') {
        setCursosInstituicao(instituicaoOptions[instituicaoOptions.map(e => e.label).indexOf(e[1])].cursos)

        let name = 'gradLocationLatitude'
    
        let value = instituicaoOptions[instituicaoOptions.map(e => e.label).indexOf(e[1])].instituicaoLatitude
          
        handleChange({ name, value })

        name = 'gradLocationLongitude'
    
        value = instituicaoOptions[instituicaoOptions.map(e => e.label).indexOf(e[1])].instituicaoLongitude
        
        handleChange({ name, value })
      }

      const name = e[0]
    
      const value = e[1]
      
      handleChange({ name, value })
    }    
  }

  const limpar = () => {
    clearGradValues()
  }
  
  if (disableDataConclusao && isEditing && statusGrad === "Atual") {
    setDisableDataConclusao(false)
    console.log(statusGrad === "Atual", disableDataConclusao, isEditing)

  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      
      <form className='form'>
        <Typography component="h1" variant="h4" align="left"> {isEditing ? 'editar experiência acadêmica' : 'adicionar experiência acadêmica'} </Typography>
                  
        <Typography variant="h6" gutterBottom>Informações acadêmicas</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              disableClearable
              disablePortal
              id="instituicao"
              name='instituicao'
              options={instituicaoOptions}  
              sx={{ maxWidth: true }}
              renderInput={(params) => <TextField {...params} label="Instituição de ensino" />}
              value={instituicao}
              onChange={(event, newValue) => {                       
                handleGradInput(['instituicao', newValue.label])
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Autocomplete
              disablePortal
              disableClearable
              id="curso"
              name='curso'
              options={cursosInstituicao}  
              sx={{ maxWidth: true }}
              renderInput={(params) => <TextField {...params} label="Área de estudo" />}
              value={curso}
              onChange={(event, newValue) => {                       
                handleGradInput(['curso', newValue.label])
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Autocomplete
              disablePortal
              disableClearable
              id="statusGrad"
              name='statusGrad'
              options={statusGradOptions}  
              sx={{ maxWidth: true }}
              renderInput={(params) => <TextField {...params} label="Situação" />}
              value={statusGrad}
              onChange={(event, newValue) => {                       
                handleGradInput(['statusGrad', newValue.label])
              }}
            />
          </Grid>
        </Grid>       
          
        <Typography variant="h6" gutterBottom>Data de início</Typography>
      
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format={'MM'} label={'Mês'} slotProps={{ textField: { fullWidth: true } }} {...dataMesInicioGraduacao ? {value:dayjs(dataMesInicioGraduacao)} : ''} views={["month"]} onChange={(date) => handleGradInput([`dataMesInicioGraduacao`, date.$d.toISOString()])}/>
            </LocalizationProvider>  
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={'Ano'} slotProps={{ textField: { fullWidth: true } }} {...dataAnoInicioGraduacao ? {value:dayjs(dataAnoInicioGraduacao)} : ''}  views={["year"]} onChange={(date) => handleGradInput(["dataAnoInicioGraduacao", date.$d.toISOString()])}/>
            </LocalizationProvider>  
          </Grid>          
        </Grid> 

        { disableDataConclusao && 
          <Typography variant="h6" gutterBottom>Data de término</Typography>
        }

        { disableDataConclusao &&
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format={'MM'} label={'Mês'} slotProps={{ textField: { fullWidth: true } }} {...dataMesFimGraduacao ? {value:dayjs(dataMesFimGraduacao)} : ''} views={["month"]} onChange={(date) => handleGradInput(["dataMesFimGraduacao", date.$d.toISOString()])}/>
              </LocalizationProvider>  
            </Grid>

            <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label={'Ano'} slotProps={{ textField: { fullWidth: true } }} {...dataAnoFimGraduacao ? {value:dayjs(dataAnoFimGraduacao)} : ''} views={["year"]} onChange={(date) => handleGradInput(["dataAnoFimGraduacao", date.$d.toISOString()])}/>
              </LocalizationProvider>  
            </Grid>          
          </Grid> 
        }

        <Stack spacing={2}>   
          <Box sx={{ display:"flex", justifyContent:"flex-end", mt: 4 }}>
            <Button variant="contained" color="error" sx={{ right: 6 }} onClick={(e) => { 
                e.preventDefault()
                
                limpar()
              }}>
                limpar
            </Button>

            <Button variant="contained" disabled={isLoading} onClick={handleSubmit}>
              {isEditing ? 'atualizar' : 'adicionar'}
            </Button>
          </Box>  
        </Stack>
      </form>
    </Wrapper>
  )
}


export default AddGrad