import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const AddGrad = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    instituicao, //
    gradLocation, //
    curso,
    gradTypeOptions, //
    gradType, // 
    statusGrad, // 
    statusGradOptions, //
    handleChange,
    clearValues,
    createGrad, //
    editGrad, //
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!instituicao || !gradLocation) {
      displayAlert()

      return
    }

    if (isEditing) {
      editGrad()

      return
    }

    createGrad()
  }

  const handleGradInput = (e) => {
    const instituicao = e.target.instituicao

    const value = e.target.value
    
    handleChange({ instituicao, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'editar curso' : 'adicionar curso'}</h3>

        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow type='text' name='instituicao' value={instituicao} labelText="nome da instituição" handleChange={handleGradInput}/>
          
          <FormRow type='text' name='curso' value={curso} labelText="curso" handleChange={handleGradInput}/>

          <FormRow type='text' labelText='Localização da empresa' name='gradLocation' value={gradLocation} handleChange={handleGradInput}/>

          <FormRowSelect name='status' value={statusGrad} handleChange={handleGradInput} list={statusGradOptions}/>

          <FormRowSelect name='gradType' labelText='modalidade de ensino' value={gradType} handleChange={handleGradInput} list={gradTypeOptions}/>

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


export default AddGrad