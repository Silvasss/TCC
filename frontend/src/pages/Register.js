import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'

import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false
}


function Register() {
  const [values, setValues] = useState(initialState)

  const navigate = useNavigate()

  const { user, isLoading, showAlert, displayAlert, setubUser } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const {name, email, password, isMember} = values

    if(!email || !password || (!isMember && !name)) {
      displayAlert()

      return
    }

    const currentUser = {name, email, password}

    if(isMember) {
      setubUser({currentUser, endPoint:'login', alertText:'Login sucessful! Redirecting...'})
    } else {
      setubUser({currentUser, endPoint:'register', alertText:'User Created! Redirecting...'})
    }    
  }

  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>

      <form className='form' onSubmit={onSubmit}>
        <Logo/>

        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {showAlert && <Alert />}

        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        
        {/* email field */}
        <FormRow type='email' name='email' value={values.email} handleChange={handleChange}/>

        {/* password field */}
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange}/>

        <button type='submit' className='btn btn-block' disabled={isLoading}>Conecte-se</button>

        <p>
          {values.isMember ? 'Não tem uma conta?' : 'Já tem uma conta?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Inscreva-se' : 'Entrar'}
          </button>
        </p>

      </form>

    </Wrapper>
  )
}

export default Register