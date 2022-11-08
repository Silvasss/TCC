import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'


const SearchContainer = () => {
  const {isLoading, search, searchStatus, searchType, sort, sortOptions, handleChange, clearFilters, jobTypeOptions, statusOptions} = useAppContext()

  const handleSearch = (e) => {
    if (isLoading){
      return
    }

    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    clearFilters()
  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>Formulário de pesquisa</h4>
        
        <div className='form-center'>
          {/* search position */}
          <FormRow type='text' name='search' labelText="nome" value={search} handleChange={handleSearch}/>

          {/* search by status */}
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['Todas', ...statusOptions]}/>

          {/* search by type */}
          <FormRowSelect labelText='Jornada de trabalho' name='searchType' value={searchType} handleChange={handleSearch} list={['Todas', ...jobTypeOptions]}/>

          {/* sort */}
          <FormRowSelect name='sort' labelText="ordem" value={sort} handleChange={handleSearch} list={sortOptions}/>

          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>limpar filtros</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
