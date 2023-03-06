import { FormRow, FormRowSelect, Alert, FormRowDate } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const AddGrad = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    instituicao, //
    curso,
    statusGrad, // 
    statusGradOptions, //
    handleChange,
    clearValues,
    createGrad, //
    editGrad, //
    dataInicioGraduacao, //
    dataFimGraduacao //
  } = useAppContext()
  
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
  }

  const handleGradInput = (e) => {
    const name = e.target.name
    
    const value = e.target.value
    
    handleChange({ name, value })
  }


  // MODIFICAÇÕES
  // ! - Campos nome da "Nome Da Instituição" e "Curso", é necessário trocar o tipo do campo de entrada para caixa de seleção
  // ! - Adicionar no "AppContext" a lista com os valores


  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'editar curso' : 'adicionar curso'}</h3>

        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow type='text' name='instituicao' value={instituicao} labelText="nome da instituição" handleChange={handleGradInput}/>
          
          <FormRow type='text' name='curso' value={curso} labelText="curso" handleChange={handleGradInput}/>

          <FormRowSelect name='statusGrad' labelText="situação" value={statusGrad} handleChange={handleGradInput} list={statusGradOptions}/>

          <FormRowDate name='dataInicioGraduacao' labelText='data de início' value={dataInicioGraduacao} handleChange={handleGradInput}/>

          <FormRowDate name='dataFimGraduacao' labelText='data de conclusão' value={dataFimGraduacao} handleChange={handleGradInput}/>

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