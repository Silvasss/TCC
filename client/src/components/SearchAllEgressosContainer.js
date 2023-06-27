import { useState, useMemo } from 'react'

import { useAppContext } from '../context/appContext'

import Wrapper from '../assets/wrappers/SearchContainer'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'


// Filtros da página de graduações do usuário
const SearchAllEgressosContainer = () => {
  const [localSearch, setLocalSearch] = useState('')

  const { isLoading, searchStatus, sort, sortOptions, handleChange, clearFilters, statusOptions, allGrads } = useAppContext()

  const handleSearch = (e) => {
    if (e[1] && e[0] && e[1]){
      handleChange({ name: e[0], value: e[1] })
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLocalSearch(null)

    clearFilters()
  }

  const debounce = () => {
    let timeoutID
    
    return (e) => {  
      if (e.target.innerHTML) {
        setLocalSearch(e.target.innerHTML)

        clearTimeout(timeoutID)      
        
        timeoutID = setTimeout(() => { handleChange({ name: "search", value: e.target.innerHTML }) }, 1000)
      } 
    }
  }
  
  const optimizedDebounce = useMemo(() => debounce(), [])
  
  let listaNomesInstituicoes = allGrads.filter((arr, index, self) => index === self.findIndex((t) => (t.instituicao === arr.instituicao)))

  listaNomesInstituicoes = (listaNomesInstituicoes.map(listaNomesInstituicoes => listaNomesInstituicoes.instituicao)).map(x => ({"value": x, "label": x}))

  return (
    <Wrapper>      
      <form className='form'>

        <h4>filtros</h4>

        <div className='form-center'>      
          <Autocomplete disableClearable disablePortal id="search" name='search' options={listaNomesInstituicoes} value={localSearch} sx={{ maxWidth: true }} renderInput={(params) => <TextField {...params} label="Selecione uma instituição" />} onChange={optimizedDebounce} />
         
          <Autocomplete disableClearable disablePortal id="searchStatus" name='searchStatus' options={statusOptions} sx={{ maxWidth: true }} renderInput={(params) => <TextField {...params} label="Situação" />} value={searchStatus} onChange={(event, newValue) => { handleSearch(['searchStatus', newValue.label]) }}/>
          
          <Autocomplete disableClearable disablePortal id="sort" name='sort' options={sortOptions} sx={{ maxWidth: true }} renderInput={(params) => <TextField {...params} label="Filtro" />} value={sort} onChange={(event, newValue) => { handleSearch(['sortUser', newValue.label]) }}/>
         
          <button className='btn btn-block limpar-btn' disabled={isLoading} onClick={handleSubmit}> limpar filtros </button>
        </div>
      </form>

    </Wrapper>
  )
}


export default SearchAllEgressosContainer