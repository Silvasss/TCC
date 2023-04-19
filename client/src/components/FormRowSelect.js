import React from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

  
const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {   
  const handleGradInput = (selecao) => {      
    handleChange([name, selecao])
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

      <InputLabel variant="standard" htmlFor="uncontrolled-native">{labelText || name}</InputLabel>

      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={list[posicaoLista].label} label="Age" onChange={handleChange}>
        {list.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}


export default FormRowSelect