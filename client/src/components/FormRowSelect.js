
  
const FormRowSelect = ({ labelText, name, value, handleChange, list, selectValue }) => {
  
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>{labelText || name}</label>

      <select name={name} value={value === '' ? 'Selecione um' : value } onChange={handleChange} className='form-select' select={selectValue}>
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}


export default FormRowSelect