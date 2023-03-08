import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import listaUniversidades from '../assets/dados/universidadesBrasil.json'
import listaEstados from '../assets/dados/estadosCidadesBrasil.json'
import listacursosSuperioresBrasil from '../assets/dados/cursosSuperioresBrasil.json'
import listaProfissoes from '../assets/dados/profissoesBrasil.json'


import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  CREATE_GRAD_BEGIN, 
  CREATE_GRAD_SUCCESS,
  CREATE_GRAD_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  GET_GRADS_BEGIN,
  GET_GRADS_SUCCESS,
  GET_ALLGRADS_BEGIN,
  GET_ALLGRADS_SUCCESS,
  SET_EDIT_JOB,
  SET_EDIT_GRAD,
  DELETE_JOB_BEGIN,
  DELETE_GRAD_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  EDIT_GRAD_BEGIN, 
  EDIT_GRAD_SUCCESS,
  EDIT_GRAD_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions'



const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '', // lista com os nomes das cidades
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  editGradId: '',
  position: '',
  positionOptions: listaProfissoes,
  curso: '',
  cursoOptions: listacursosSuperioresBrasil.map(cursosSuperioresBrasil => cursosSuperioresBrasil.name), // lista com os nomes dos cursos
  nomeEgresso: '', //
  company: '',
  instituicao: '',
  instituicaoOptions: listaUniversidades.map(listaUniversidades => listaUniversidades["ACADEMIA DA FORÇA AÉREA"]), // lista com os nomes das instituiçoes
  jobLocation: userLocation || '',  
  gradLocation: listaEstados.map(listaEstados => listaEstados.Nome), // lista com os nomes das cidades
  jobTypeOptions: ['Tempo integral', 'Tempo parcial', 'Remoto', 'Estágio'],
  jobType: 'Tempo integral',
  statusOptions: ['Atual', 'Anterior'],
  statusGradOptions: ['Anterior', 'Atual'], //
  status: 'Anterior',
  statusGrad: 'Anterior', // 
  dataInicioGraduacao: '', //
  dataFimGraduacao: '', //
  jobs: [],
  grads: [],
  totalJobs: 0,
  totalGrads: 0,  // Quantidade de graduações que foram encontradas
  totalUserGrads: 0,  // Quantidade de graduações do usuário que foram encontradas
  numOfPages: 1, // Número total de páginas de todas as graduações
  numOfPagesUserGrads: 1, // Número total de páginas de todas as graduações do usuário
  pageUserGrads: 1, // Número da página atual das proprias graduações do usuário, que ele está visualizando
  pageTodasGrads: 1, // Número da página atual de todas as graduações que o usuário está visualizando
  stats: {},
  search: '',
  searchStatus: 'todos',
  searchType: 'todos',
  sort: 'ultimo',
  sortOptions: ['ultimo', 'antigo', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  // axios
  const authFetch = axios.create({baseURL: '/api/v1',})

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })

    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  // ----------------------------------User-----------------------------------
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))

    localStorage.setItem('token', token)

    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')

    localStorage.removeItem('user')

    localStorage.removeItem('location')
  }
  
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })

    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })

      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,        
        payload: { msg: error.response.data.msg },
      })
    }

    clearAlert()
  }
  
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })

    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })

      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }

    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  // ------------------------------END-User----------------------------------

  // ----------------------------------Jobs----------------------------------
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })

    try {
      const { position, company, jobLocation, jobType, status } = state

      await authFetch.post('/jobs', {position, company, jobLocation, jobType, status})

      dispatch({ type: CREATE_JOB_SUCCESS })

      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        return
      }

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }

    clearAlert()
  }

  const getJobs = async () => {
    const { pageUserGrads, search, searchStatus, searchType, sort } = state
    
    let url = `/jobs?page=${pageUserGrads}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`

    if (search) {
      url = url + `&search=${search}`
    }

    dispatch({ type: GET_JOBS_BEGIN })

    try {
      const { data } = await authFetch(url)

      const { jobs, totalJobs, numOfPages } = data
      
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }

    clearAlert()
  }

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })

    try {
      const { position, company, jobLocation, jobType, status } = state

      await authFetch.patch(`/jobs/${state.editJobId}`, {company, position, jobLocation, jobType, status})

      dispatch({ type: EDIT_JOB_SUCCESS })

      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        return
      }

      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }

    clearAlert()
  }

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN })

    try {
      await authFetch.delete(`/jobs/${jobId}`)

      getJobs()
    } catch (error) {
      logoutUser()
    }
  }
  // ----------------------------------END-Jobs----------------------------------

  // ----------------------------------Grad--------------------------------------
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })

    try {
      const { data } = await authFetch('/grads/stats')

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats
        },
      })
    } catch (error) {
      //logoutUser()
      console.log(error)
    }

    clearAlert()
  }

  const createGrad = async () => {
    dispatch({ type: CREATE_GRAD_BEGIN })

    try {
      const { curso, instituicao, statusGrad, dataInicioGraduacao, dataFimGraduacao } = state

      let nomeEgresso = JSON.parse(user).name + " " + JSON.parse(user).lastName
      
      await authFetch.post('/grads', {nomeEgresso , curso, instituicao, statusGrad, dataInicioGraduacao, dataFimGraduacao})

      dispatch({ type: CREATE_GRAD_SUCCESS })

      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        return
      }

      dispatch({
        type: CREATE_GRAD_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }

    clearAlert()
  }

  const getGrads = async () => {
    const { pageTodasGrads, search, searchStatus, searchType, sort } = state

    let url = `/grads?page=${pageTodasGrads}&status=${searchStatus}&gradType=${searchType}&sort=${sort}`

    if (search) {
      url = url + `&search=${search}`
    }

    dispatch({ type: GET_GRADS_BEGIN })

    try {
      const { data } = await authFetch(url)

      const { grads, totalUserGrads, numOfPagesUserGrads } = data
      
      dispatch({
        type: GET_GRADS_SUCCESS,
        payload: {
          grads,
          totalUserGrads,
          numOfPagesUserGrads,
        },
      })
    } catch (error) {
      logoutUser()
    }

    clearAlert()
  }

  const getEgressos = async () => {
    const { page, search, searchStatus, searchType, sort } = state

    let url = `/grads/getegressos?page=${page}&status=${searchStatus}&gradType=${searchType}&sort=${sort}`

    if (search) {
      url = url + `&search=${search}`
    }

    dispatch({ type: GET_ALLGRADS_BEGIN })

    try {
      const { data } = await authFetch(url)
      
      const { grads, totalGrads, numOfPages } = data
      
      dispatch({
        type: GET_ALLGRADS_SUCCESS,
        payload: {
          grads,
          totalGrads,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    
    clearAlert()
  }

  const setEditGrad = (id) => {
    dispatch({ type: SET_EDIT_GRAD, payload: { id } })
  }

  const editGrad = async () => {
    dispatch({ type: EDIT_GRAD_BEGIN })

    try {
      const { curso, instituicao, gradLocation, gradType, statusGrad } = state

      await authFetch.patch(`/grads/${state.editGradId}`, {curso, instituicao, gradLocation, gradType, statusGrad})

      dispatch({ type: EDIT_GRAD_SUCCESS })

      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        return
      }

      dispatch({
        type: EDIT_GRAD_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }

    clearAlert()
  }

  const deleteGrad = async (gradId) => {
    dispatch({ type: DELETE_GRAD_BEGIN })

    try {
      await authFetch.delete(`/grads/${gradId}`)

      getGrads()
    } catch (error) {
      logoutUser()
    }
  }

  const showStatsGrad = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })

    try {
      const { data } = await authFetch('/grads/stats')

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats
        },
      })
    } catch (error) {
      logoutUser()
    }

    clearAlert()
  }
  // --------------------------------END-Grad--------------------------------------

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        createGrad,
        getJobs,
        setEditJob,
        setEditGrad,
        deleteJob,
        deleteGrad,
        editJob,
        editGrad,
        showStats,
        showStatsGrad,
        clearFilters,
        changePage,
        getGrads,
        getEgressos
      }}>

      {children}

    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}


export { AppProvider, initialState, useAppContext }