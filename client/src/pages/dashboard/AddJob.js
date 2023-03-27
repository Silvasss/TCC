import { useEffect, useState } from 'react'

import { City, Country, State } from "country-state-city"
import Select from 'react-select'

import { FormRow, FormRowSelect, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'


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
    gradLocation,
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

  useEffect(() => {setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode))}, [state])

  // Melhorar isso!
  useEffect(() => {
    if(country.isoCode !== jobLocation){
      setState(stateData)
    }
  }, [stateData])

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

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'editar trabalho' : 'adicionar trabalho'}</h3>

        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRowSelect name='position' labelText="Selecione um cargo" value={position} handleChange={handleJobInput} list={positionOptions}/>
          
          <FormRow type='text' name='company' value={company} labelText="empresa" handleChange={handleJobInput}/>

          {          
          ///<FormRowSelect name='jobLocation' labelText="Localização da empresa" value={jobLocation} handleChange={handleJobInput} list={gradLocation}/>
          }
          <FormRowSelect name='status' labelText="Situação" value={status} handleChange={handleJobInput} list={statusOptions}/>

          <FormRowSelect name='jobType' labelText='Jornada de trabalho' value={jobType} handleChange={handleJobInput} list={jobTypeOptions}/>

          <div className='form-row'>
            <label className='form-label'>{'localização do País'}</label>
                
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
              <label className='form-label'>{'localização do Estado'}</label>
              
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
              <label className='form-label'>{'localização do Cidade'}</label>
                  
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

          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>adicionar</button>
            
            <button className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()

                clearValues()
              }}>
              limpar
            </button>            
          </div>

        </div> 
      </form>
    </Wrapper>
  )
}


export default AddJob