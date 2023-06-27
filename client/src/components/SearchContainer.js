import { useState, useMemo } from 'react'

import { useAppContext } from '../context/appContext'

import Wrapper from '../assets/wrappers/SearchContainer'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'


// Filtros da página de graduações do usuário
const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')

  const { isLoading, searchUserStatus, sortUser, sortOptions, handleChange, clearUSERFilters, statusOptions, userGrads } = useAppContext()

  const handleSearch = (e) => {
    if (e[1] && e[0] && e[1]){
      handleChange({ name: e[0], value: e[1] })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLocalSearch('')

    clearUSERFilters()
  }

  const debounce = () => {
    let timeoutID
    
    return (e) => {
      if (e.target.innerHTML) {
        setLocalSearch(e.target.innerHTML)

        clearTimeout(timeoutID)    

        timeoutID = setTimeout(() => { handleChange({ name: 'searchUser', value: e.target.innerHTML }) }, 1000)
      }       
    }
  }
  
  const optimizedDebounce = useMemo(() => debounce(), [])

  let listaNomesInstituicoes = userGrads.filter((arr, index, self) => index === self.findIndex((t) => (t.instituicao === arr.instituicao)))

  listaNomesInstituicoes = (listaNomesInstituicoes.map(listaNomesInstituicoes => listaNomesInstituicoes.instituicao)).map(x => ({"value": x, "label": x}))

  return (
    <Wrapper>      
      <form className='form'>

        <h4>filtros</h4>

        <div className='form-center'>
          <Autocomplete disableClearable disablePortal id="searchUser" name='searchUser' options={listaNomesInstituicoes} sx={{ maxWidth: true }} renderInput={(params) => <TextField {...params} label="Selecione uma instituição" />} value={localSearch} onChange={optimizedDebounce}/>

          <Autocomplete disableClearable disablePortal id="searchUserStatus" name='searchUserStatus' options={statusOptions} sx={{ maxWidth: true }} renderInput={(params) => <TextField {...params} label="Situação" />} value={searchUserStatus} onChange={(event, newValue) => { handleSearch(['searchUserStatus', newValue.label]) }}/>
          
          <Autocomplete disableClearable disablePortal id="sortUser" name='sortUser' options={sortOptions} sx={{ maxWidth: true }} renderInput={(params) => <TextField {...params} label="Filtro" />} value={sortUser} onChange={(event, newValue) => { handleSearch(['sortUser', newValue.label]) }}/>

          <button className='btn btn-block limpar-btn' disabled={isLoading} onClick={handleSubmit}> limpar filtros </button>
        </div>
      </form>

    </Wrapper>
  )
}


export default SearchContainer