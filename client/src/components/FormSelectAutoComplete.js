import React from "react"

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'


const AutoComplete = ({ labelText, name, value, handleChange, list }) => {
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
            <Autocomplete disablePortal id="combo-box-demo" options={list} getOptionLabel={(option) => option.label} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label={labelText || name} />}
                value={list[posicaoLista]}
                onChange={(event, newValue) => {
                    handleGradInput(newValue.label)
                }}
            />       
        </div>
    )
}


export default AutoComplete