import { useEffect, useState } from 'react'

import { City, Country, State } from "country-state-city"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { useAppContext } from '../../context/appContext'

import Wrapper from '../../assets/wrappers/DashboardFormPage'

import { Alert } from '../../components'



const Profile = () => {
  // ------------Problemas----------
  // Quando ocorre alteração no estado/país, não é alterado o valor apresentado na caixa de seleção
  // Adicionar a opção "value" e modificar o estado dela quando ocorrer o update dos valores

  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

  let countryData = Country.getAllCountries()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)

  const [stateData, setStateData] = useState()
  const [cityData, setCityData] = useState()
  
  // -----------Valores iniciais---------------------------------
  const [country, setCountry] = useState(Country.getCountryByCode(user.location))
     
  const [state, setState] = useState(State.getStateByCodeAndCountry(user?.locationEstado, user?.location))
  
  const [city, setCity] = useState(
    City.getCitiesOfState(user?.location, user?.locationEstado)[City.getCitiesOfState(user?.location, user?.locationEstado).map(e => e.name).indexOf(user.locationCidade)]
  )
  // ------------------------------------------------------------

  useEffect(() => {setStateData(State.getStatesOfCountry(country?.isoCode))}, [country])

  useEffect(() => {setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode))}, [state])

  //useEffect(() => {stateData && setState(stateData)}, [stateData])
  
  // Melhorar isso!
  useEffect(() => {
    if(country.isoCode !== user?.location){
      setState(stateData)
    }
  }, [country])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !country.name) {
      displayAlert()

      return
    }
    
    if (Array.isArray(stateData) && stateData.length === 0) {
      updateUser({ name, email, locationPais: country.isoCode, nomePais: country.name, locationEstado: null, locationCidade: null })
    } else {
      updateUser({ name, email, locationPais: country.isoCode, nomePais: country.name, locationEstado: state.isoCode, locationCidade: city.name })
    }    
  } 

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <Typography component="h1" variant="h4" align="center"> perfil </Typography>

        {showAlert && <Alert />}

        <Typography variant="h6" gutterBottom>Informações básicas</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField required id="name" name="name" label="Nome" fullWidth autoComplete="given-name" variant="outlined" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField required id="emaill" name="email" label="Email" fullWidth autoComplete="given-email" variant="outlined" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>Localidade</Typography>

        <Stack spacing={2}>          
          <Grid container spacing={2}>  
            <Grid item xs={1} sm={4}>
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

            {
              (Array.isArray(stateData) && stateData.length > 0) &&                
                <Grid item xs={2} sm={4}>
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
                </Grid>
            }

            {
              (Array.isArray(cityData) && cityData.length > 0) && 
              <Grid item xs={3} sm={4}>
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
              </Grid>          
            }
          </Grid>

          <Grid>
            <Button variant="contained" fullWidth className='btn btn-block' type='submit' disabled={isLoading}>
              {isLoading ? 'Por favor, aguarde...' : 'salvar alterações'}
            </Button>
          </Grid> 
        </Stack>
      </form>
      
    </Wrapper> 
  )
}


export default Profile