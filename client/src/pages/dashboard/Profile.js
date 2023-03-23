import { useEffect, useState } from 'react'

import { City, Country, State } from "country-state-city"

import { FormRow, Alert, JobsContainer, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import Select from 'react-select'


const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, gradLocation } = useAppContext()

  let countryData = Country.getAllCountries()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [location, setLocation] = useState(user?.location)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !location) {
      displayAlert()

      return
    }

    updateUser({ name, email, location })
  }

  const [stateData, setStateData] = useState()
  const [cityData, setCityData] = useState()

  const [country, setCountry] = useState(countryData[0])
  const [state, setState] = useState()
  const [city, setCity] = useState()

  useEffect(() => {setStateData(State.getStatesOfCountry(country?.isoCode))}, [country])

  useEffect(() => {setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode))}, [state])

  useEffect(() => {stateData && setState(stateData[0])}, [stateData])

  useEffect(() => {cityData && setCity(cityData[0])}, [cityData])

  //console.log(countryData)

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
          
          <FormRowSelect
            name='Localização' 
            value={location} 
            handleChange={(e) => setLocation(e[1])} 
            list={gradLocation}
            selectValue={location}
          />

          <Select name={name} 
            placeholder='Selecione um País'
            options={countryData}  
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.name}
            onChange={setCountry}
          />     
          
          <Select name={name} 
            placeholder='Selecione o Estado'
            options={stateData}  
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.name}
            onChange={setState}
          />
          
          <Select name={name} 
            placeholder='Selecione a Cidade'
            options={cityData}  
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.name}
            onChange={setCity}
          /> 

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Por favor, aguarde...' : 'salvar alterações'}
          </button>
        </div>
      </form>

      <JobsContainer />     
      
    </Wrapper> 
  )
}


export default Profile