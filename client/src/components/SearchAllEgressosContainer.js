import { useState, useMemo } from 'react'

import { useAppContext } from '../context/appContext'

import { FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'


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

    setLocalSearch('')

    clearFilters()
  }

  const debounce = () => {
    let timeoutID
    
    return (e) => {  
      if (e[0] && e[1]) {
        setLocalSearch(e[1])

        clearTimeout(timeoutID)      
        
        timeoutID = setTimeout(() => { handleChange({ name: e[0], value: e[1] }) }, 1000)
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
          <FormRowSelect name='search' labelText="Selecione uma instituição" value={localSearch} handleChange={optimizedDebounce} list={listaNomesInstituicoes}/>

          <FormRowSelect name='searchStatus' labelText='situação' value={searchStatus} handleChange={handleSearch} list={statusOptions} />
          
          <FormRowSelect name='sort' labelText="Filtro" value={sort} handleChange={handleSearch} list={sortOptions} />
          
          <button className='btn btn-block limpar-btn' disabled={isLoading} onClick={handleSubmit}> limpar filtros </button>
        </div>
      </form>

    </Wrapper>
  )
}


export default SearchAllEgressosContainer