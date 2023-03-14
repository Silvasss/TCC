import React, { useState } from 'react'

import { useAppContext } from '../../context/appContext'

import { FormRowSelect, Alert, FormRowDate } from '../../components'
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

  const [disableDataConclusao, setDisableDataConclusao] = useState(false)

  const handleGradInput = (e) => {    

    try {
      if (e.target.name === 'statusGrad' && e.target.value === 'Atual') {
        
        setDisableDataConclusao(true)
      }

      const name = e.target.name
    
      const value = e.target.value
      
      handleChange({ name, value })
    } catch (error) {
      const name = e[0]
    
      const value = e[1]
      
      handleChange({ name, value })
    }    
  }

  // MODIFICAÇÕES
  // 1 - Criar um campo de seleção que permite digitar pra buscar que funcione corretamente!

  // Problemas!
  // 1 - Campo de entrada da data e desativado, mas não é ativado novamente
  
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
          
          <FormRowDate name='dataFimGraduacao' labelText='data de conclusão' enabled={disableDataConclusao} value={dataFimGraduacao} handleChange={handleGradInput}/>

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