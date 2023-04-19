import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../../context/appContext'

import { Alert, AutoComplete } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

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

      const name = e.target.name
    
      const value = e.target.value
      
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
    
  return (
    <Wrapper>
      {showAlert && <Alert />}
      
      <form className='form'>
        <Typography component="h1" variant="h4" align="left"> {isEditing ? 'editar curso' : 'adicionar curso'} </Typography>
        
        <Stack spacing={1}>     
          <Typography variant="h6" gutterBottom>Informações acadêmicas</Typography>

          <Grid container spacing={0}>
            <Grid item xs={6} md={4}>
              <AutoComplete name='instituicao' labelText="Instituição de ensino" value={instituicao} handleChange={handleGradInput} list={instituicaoOptions}/>
            </Grid>

            <Grid item xs={6} md={4}>
              <AutoComplete name='curso' labelText="Área de estudo" value={curso} handleChange={handleGradInput} list={cursosInstituicao}/>
            </Grid>

            <Grid item xs={6} md={4}>
              <AutoComplete name='statusGrad' labelText="Situação" value={statusGrad} handleChange={handleGradInput} list={statusGradOptions}/>
            </Grid>
          </Grid>       
            
          <Typography variant="h6" gutterBottom>Data de início</Typography>
        
          <Grid container spacing={0}>
            <Grid item xs={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker format={'MM'} label={'Mês'} {...dataMesInicioGraduacao ? {value:dayjs(dataMesInicioGraduacao)} : ''} views={["month"]} onChange={(date) => handleGradInput([`dataMesInicioGraduacao`, date.$d.toISOString()])}/>
              </LocalizationProvider>  
            </Grid>

            <Grid item xs={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label={'Ano'} {...dataAnoInicioGraduacao ? {value:dayjs(dataAnoInicioGraduacao)} : ''}  views={["year"]} onChange={(date) => handleGradInput(["dataAnoInicioGraduacao", date.$d.toISOString()])}/>
              </LocalizationProvider>  
            </Grid>          
          </Grid> 

          { disableDataConclusao && 
            <Typography variant="h6" gutterBottom>Data de término</Typography>
          }

          { disableDataConclusao &&
            <Grid container spacing={0}>
              <Grid item xs={6} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker format={'MM'} label={'Mês'} {...dataMesFimGraduacao ? {value:dayjs(dataMesFimGraduacao)} : ''} views={["month"]} onChange={(date) => handleGradInput(["dataMesFimGraduacao", date.$d.toISOString()])}/>
                </LocalizationProvider>  
              </Grid>

              <Grid item xs={6} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label={'Ano'} {...dataAnoFimGraduacao ? {value:dayjs(dataAnoFimGraduacao)} : ''} views={["year"]} onChange={(date) => handleGradInput(["dataAnoFimGraduacao", date.$d.toISOString()])}/>
                </LocalizationProvider>  
              </Grid>          
            </Grid> 
          }
          
          <Box sx={{ display:"flex", justifyContent:"flex-end" }}>
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