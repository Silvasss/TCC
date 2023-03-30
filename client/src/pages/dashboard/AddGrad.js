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
    handleChange,
    clearValues,
    createGrad, //
    editGrad, //
    dataInicioGraduacao, //
    dataFimGraduacao, //
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

  const [disableDataConclusao, setDisableDataConclusao] = useState(true)

  const [cursosInstituicao, setCursosInstituicao] = useState(instituicaoOptions[0].cursos)
  
  const handleGradInput = (e) => {    
    try {
      if (e[0] === 'statusGrad' && e[1] === 'Atual') {
        setDisableDataConclusao(false)
      } else {
        setDisableDataConclusao(true)
      }

      const name = e.target.name
    
      const value = e.target.value
      
      handleChange({ name, value })
    } catch (error) {
      if (e[0] === 'instituicao') {setCursosInstituicao(instituicaoOptions[instituicaoOptions.map(e => e.label).indexOf(e[1])].cursos)}

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
        <h3>{isEditing ? 'editar curso' : 'adicionar curso'}</h3>

        {showAlert && <Alert />}

        <div className='form-center'>     
          <FormRowSelect name='instituicao' labelText="Selecione uma instituição" value={instituicao} handleChange={handleGradInput} list={instituicaoOptions}/>
          
          <FormRowSelect name='curso' labelText="Selecione um curso" value={curso} handleChange={handleGradInput} list={cursosInstituicao}/>

          <FormRowSelect name='statusGrad' labelText="situação" value={statusGrad} handleChange={handleGradInput} list={statusGradOptions}/>

          <FormRowDate name='dataInicioGraduacao' labelText='data de início' value={dataInicioGraduacao} handleChange={handleGradInput}/>
          
          { disableDataConclusao &&
            <FormRowDate name='dataFimGraduacao' labelText='data de conclusão' value={dataFimGraduacao} handleChange={handleGradInput}/>
          }
                    
          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>{isEditing ? 'atualizar' : 'adicionar'}</button>
            
            <button className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                
                limpar()
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