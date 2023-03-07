import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


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
  } = useAppContext()

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
    const name = e.target.name

    const value = e.target.value
    
    handleChange({ name, value })
  }
  
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'editar trabalho' : 'adicionar trabalho'}</h3>

        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRowSelect name='position' labelText="Selecione um cargo" value={position} handleChange={handleJobInput} list={positionOptions}/>
          
          <FormRow type='text' name='company' value={company} labelText="empresa" handleChange={handleJobInput}/>

          <FormRowSelect name='jobLocation' labelText="Localização da empresa" value={jobLocation} handleChange={handleJobInput} list={gradLocation}/>

          <FormRowSelect name='Situação' value={status} handleChange={handleJobInput} list={statusOptions}/>

          <FormRowSelect name='jobType' labelText='Jornada de trabalho' value={jobType} handleChange={handleJobInput} list={jobTypeOptions}/>

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