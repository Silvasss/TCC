import React from 'react'
import Select from 'react-select'

  
const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {   
  const handleGradInput = (selecao, nome) => {  
    handleChange([nome.name, selecao.value])
  } 

  let posicaoLista

  try {
    const novaLista = list.map(list => list["value"])
  
    posicaoLista = novaLista.findIndex((x) => x === value.charAt(0).toUpperCase() + value.slice(1))
    
    posicaoLista = posicaoLista === -1 ? posicaoLista + 1 : posicaoLista
  } catch (error) {}


  // *****Problemas******
  //
  // Função limpar não funciona!
  //
  // ********************

  
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>{labelText || name}</label>

      <Select name={name} defaultValue={list[posicaoLista]} options={list} onChange={handleGradInput} />      
    </div>
  )
}


export default FormRowSelect