import { useEffect, useState } from 'react'

import { City, Country, State } from "country-state-city"

import { useAppContext } from '../../context/appContext'

import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import Select from 'react-select'


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
        <h3>perfil</h3>

        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            labelText="nome"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          
          <div className='form-row'>
            <label htmlFor={name} className='form-label'>{'localização do País'}</label>
                
            <Select 
              placeholder='Selecione um País'
              options={countryData}  
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              onChange={setCountry}
              defaultValue={country}
            />     
          </div>
          
          {
            (Array.isArray(stateData) && stateData.length > 0) &&
            
            <div className='form-row'>
              <label htmlFor={name} className='form-label'>{'localização do Estado'}</label>
              
              <Select 
                placeholder='Selecione o Estado'
                options={stateData} 
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                onChange={setState}
                defaultValue={state}
              />  
            </div>
          }

          {
            (Array.isArray(cityData) && cityData.length > 0) &&

            <div className='form-row'>
              <label htmlFor={name} className='form-label'>{'localização do Cidade'}</label>
                  
              <Select 
                placeholder='Selecione a Cidade'
                options={cityData}  
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                onChange={setCity}
                defaultValue={city}
              />    
            </div>
          }

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Por favor, aguarde...' : 'salvar alterações'}
          </button>
        </div>
      </form>
      
    </Wrapper> 
  )
}


export default Profile