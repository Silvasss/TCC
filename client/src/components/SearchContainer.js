import { useState, useMemo } from 'react'

import { useAppContext } from '../context/appContext'

import { FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'


const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')

  const { isLoading, searchStatus, sort, sortOptions, handleChange, clearFilters, instituicaoOptions, statusOptions } = useAppContext()

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLocalSearch('')

    clearFilters()
  }

  const debounce = () => {
    let timeoutID

    return (e) => {
      setLocalSearch(e.target.value)

      clearTimeout(timeoutID)

      timeoutID = setTimeout(() => { handleChange({ name: e.target.name, value: e.target.value }) }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>      
      <form className='form'>

        <h4>search form</h4>

        <div className='form-center'>
          {
            //<FormRow type='text' name='Selecione Uma Instituição' value={localSearch} handleChange={optimizedDebounce} />
            
            // Não está funcionando
            <FormRowSelect name='instituicao' labelText="Selecione uma instituição" value={localSearch} handleChange={optimizedDebounce} list={instituicaoOptions}/>
          }
          <FormRowSelect labelText='situação' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['Todos', ...statusOptions]} />

          {
            // Só um filtro está funcionando 
            <FormRowSelect name='filtro' value={sort} handleChange={handleSearch} list={sortOptions} />
          }

          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}> limpar filtros </button>
        </div>
      </form>

    </Wrapper>
  )
}


export default SearchContainer