import { FormRowSelect, Alert, FormRowDate } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


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
    cursoOptions, //
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
  // 1 - Criar um campo de seleção que permite digitar pra buscar que funcione corretamente!
  // 2 - Desativar os campos de datas de acordo com a situação do curso

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'editar curso' : 'adicionar curso'}</h3>

        {showAlert && <Alert />}

        <div className='form-center'>     
          <FormRowSelect name='instituicao' labelText="Selecione uma instituição" value={instituicao} handleChange={handleGradInput} list={instituicaoOptions}/>
          
          <FormRowSelect name='curso' labelText="Selecione um curso" value={curso} handleChange={handleGradInput} list={cursoOptions}/>

          <FormRowSelect name='statusGrad' labelText="situação" value={statusGrad} handleChange={handleGradInput} list={statusGradOptions}/>

          <FormRowDate name='dataInicioGraduacao' labelText='data de início' value={dataInicioGraduacao} handleChange={handleGradInput}/>

          <FormRowDate name='dataFimGraduacao' labelText='data de conclusão' value={dataFimGraduacao} handleChange={handleGradInput}/>

          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>{isEditing ? 'atualizar' : 'adicionar'}</button>
            
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