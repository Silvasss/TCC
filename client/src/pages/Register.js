import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState(initialState)

  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  
  const onSubmit = (e) => {
    e.preventDefault()

    const { name, email, password, isMember } = values

    if (!email || !password || (!isMember && !name)) {
      displayAlert()

      return
    }

    const currentUser = { name, email, password }

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login efetuado! Redirecionando...',
      })
    } else {    
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Usuário criado! Redirecionando...',
      })
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />

        <h3>{values.isMember ? 'Login' : 'Inscreva-se'}</h3>

        {showAlert && <Alert />}
        
        {!values.isMember && (
          <FormRow type='text' name='name' labelText="nome" value={values.name} handleChange={handleChange}/>
        )}

        <FormRow type='email' name='email' value={values.email} handleChange={handleChange}/>

        <FormRow  type='password' name='password' labelText="senha" value={values.password} handleChange={handleChange}/>

        <button type='submit' className='btn btn-block' disabled={isLoading}>Conecte-se</button>

        <p>
          {values.isMember ? 'Não tem uma conta?' : 'Já tem uma conta?'}

          <button type='button' onClick={toggleMember} className='member-btn'>{values.isMember ? 'Inscreva-se' : 'Entrar'}</button>
        </p>
      </form>
    </Wrapper>
  )
}


export default Register