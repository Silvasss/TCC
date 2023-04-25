import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { City, Country, State } from "country-state-city"

import { Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'


const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    positionOptions,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    jobLocationEstado, 
    jobLocationCidade
  } = useAppContext()

  const navigate = useNavigate()

  let countryData = Country.getAllCountries()
  
  const [stateData, setStateData] = useState()
  const [cityData, setCityData] = useState()
  
  // -----------Valores iniciais---------------------------------
  const [country, setCountry] = useState(Country.getCountryByCode(jobLocation))
     
  const [state, setState] = useState(State.getStateByCodeAndCountry(jobLocationEstado, jobLocation))
  
  const [city, setCity] = useState(
    City.getCitiesOfState(jobLocation, jobLocationEstado)[City.getCitiesOfState(jobLocation, jobLocationEstado).map(e => e.name).indexOf(jobLocationCidade)]
  )
  // ------------------------------------------------------------

  useEffect(() => {setStateData(State.getStatesOfCountry(country?.isoCode))}, [country])

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode))

    handleChange({ name: 'jobLocationEstado', value: state?.isoCode })
    
    handleChange({ name: 'jobLocationLatitude', value: state?.latitude })

    handleChange({ name: 'jobLocationLongitude', value: state?.longitude })
  }, [state])

  useEffect(() => {
    handleChange({ name: 'jobLocationCidade', value: city?.name })
    
    handleChange({ name: 'jobLocationLatitude', value: city?.latitude })

    handleChange({ name: 'jobLocationLongitude', value: city?.longitude })
  }, [city])

  // Melhorar isso!
  useEffect(() => {
    if(country.isoCode !== jobLocation){
      setState(stateData)
    }
  }, [country])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlert()

      return
    }

    if (isEditing) {
      editJob()

      return
    }

    createJob()

    limpar()

    navigate('/all-jobs')
  }
  
  const handleJobInput = (e) => {
    try {
      const name = e.target.name

      const value = e.target.value
      
      handleChange({ name, value })
    } catch (error) {
      const name = e[0]
    
      const value = e[1]
      
      handleChange({ name, value })
    }    
  }      

  const limpar = () => {
    clearValues()
  }

  return (
    <Wrapper>
      <form className='form'>
        <Typography component="h1" variant="h4" align="left"> {isEditing ? 'editar experiência profissional' : 'adicionar experiência profissional'} </Typography>

        {showAlert && <Alert />}

        <Typography variant="h6" gutterBottom>Informações básicas</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              disablePortal
              id="position"
              name='position'
              options={positionOptions}  
              sx={{ maxWidth: true }}
              renderInput={(params) => <TextField {...params} label="Selecione um Setor" />}
              value={position}
              onChange={(event, newValue) => {                       
                handleJobInput(['position', newValue.label])
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField required id="company" name="company" label="Nome da empresa" fullWidth autoComplete="given-empresa" variant="outlined" value={company} onChange={(e) => handleJobInput(e)}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              id="status"
              name='status'
              options={statusOptions}  
              sx={{ maxWidth: true }}
              renderInput={(params) => <TextField {...params} label="Situação" />}
              value={status}
              onChange={(event, newValue) => {                       
                handleJobInput(['status', newValue.label])
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              id="jobType"
              name='jobType'
              options={jobTypeOptions}  
              sx={{ maxWidth: true }}
              renderInput={(params) => <TextField {...params} label="Tipo de emprego" />}
              value={jobType}
              onChange={(event, newValue) => {                       
                handleJobInput(['jobType', newValue.label])
              }}
            />
          </Grid>                               
        </Grid>

        <Typography variant="h6" gutterBottom>Localidade</Typography>

        <Stack spacing={2}>          
          <Grid container spacing={2}>  
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={countryData}  
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="País" />}
                value={country}
                onChange={(event, newValue) => {
                  setCountry(newValue)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              {
                (Array.isArray(stateData) && stateData.length > 0) &&                
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[state, ...stateData]}  
                    filterOptions={() => stateData}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Estado" />}
                    value={stateData.indexOf(state) === -1 ? stateData[0] : state}
                    onChange={(event, newValue) => {                         
                      setState(newValue)
                    }}
                  />
              }
            </Grid>

            <Grid item xs={12} sm={4}>
              {
                (Array.isArray(cityData) && cityData.length > 0) &&             
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[city, ...cityData]}  
                    filterOptions={() => cityData}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Cidade" />}
                    value={cityData.indexOf(city) === -1 ? cityData[0] : city}
                    onChange={(event, newValue) => {
                      setCity(newValue)
                    }}
                  />                    
              }
            </Grid> 
          </Grid>
          
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


export default AddJob