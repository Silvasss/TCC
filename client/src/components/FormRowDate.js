import React, { useState } from 'react'

//import DatePicker from "react-datepicker"
//import "react-datepicker/dist/react-datepicker.css"

import { useAppContext } from '../context/appContext'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


const FormRowDate = ({ enabled, name, handleChange, labelText, value }) => {
  const { isEditing }  = useAppContext()

  const ativar = enabled === undefined ? false : enabled

  const [startDate, setStartDate] = useState(new Date())
  
  const handleGradInput = (date, nome) => {    
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    
    setStartDate(date)

    handleChange([nome, formattedDate])
  }  
  
  // Verifica se o campo "Data De Conclusão" tem a data informada, caso não tenha recebe "02/02/2008"
  const dataDefault = isEditing ? (value === "" ? new Date("02/02/2008") : new Date(value)) : startDate

  return (
    <div className='form-row'>
      {     
      //<label htmlFor={name} className='form-label'>{labelText || name}</label>
      // <DatePicker name={name} disabled={ativar} selected={dataDefault} dateFormat="dd/MM/yyyy" openToDate={new Date("02/02/2008")} onChange={(date) => handleGradInput(date, name)} className='form-input '/>
      }    

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={labelText}
          views={["year"]}
        />
      </LocalizationProvider>    
    
    </div>
  )
}
  
  
export default FormRowDate