

const FormRowDate = ({ disable, name, handleChange, labelText }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>{labelText || name}</label>
  
        <input type={'date'} name={name} disabled={disable} onChange={handleChange} className='form-input'/>
      </div>
    )
  }
  
  
  export default FormRowDate