import { initialState } from './appContext'
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
  CLEAR_USERFILTERS,
  CHANGE_PAGE,
  GET_EGRESSO_PROFILE_BEGIN,
  GET_EGRESSO_PROFILE_SUCCESS,
  UPDATE_EDIT_GRAD_JUSTIFICATIVA
} from './actions'


const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Forneça todos os valores!',
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {...state, isLoading: true}
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {...state, showSidebar: !state.showSidebar}
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: '',
      userLocation: '',
    }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {...state, isLoading: true}
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Perfil atualizado!',
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    }
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: '',
      position: '',
      company: '',
      jobLocation: state.userLocation,
      jobType: 'Tempo integral',
      status: 'Pendente'
    }

    return {...state, ...initialState,}
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {...state, isLoading: true}
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Experiência de trabalho adicionada!',
    }
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  //_____________________--______________________---
  if (action.type === CREATE_GRAD_BEGIN) {
    return {...state, isLoading: true}
  }

  if (action.type === CREATE_GRAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Graduação adicionada!',
    }
  }

  if (action.type === CREATE_GRAD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  //_____________________--______________________---

  if (action.type === GET_JOBS_BEGIN) {
    return {...state, isLoading: true, showAlert: false}
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    }
  }

  //_____________________--______________________---
  if (action.type === GET_GRADS_BEGIN) {
    return {...state, isLoading: true, showAlert: false}
  }

  if (action.type === GET_GRADS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userGrads: action.payload.userGrads,
      totalUserGrads: action.payload.totalUserGrads,
      numOfPagesUserGrads: action.payload.numOfPagesUserGrads
    }
  }

  if (action.type === GET_ALLGRADS_BEGIN) {
    return {...state, isLoading: true, showAlert: false}
  }

  if (action.type === GET_ALLGRADS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allGrads: action.payload.allGrads,
      totalAllGrads: action.payload.totalAllGrads,
      numOfPages: action.payload.numOfPages,
    }
  }

  if (action.type === GET_EGRESSO_PROFILE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }

  if (action.type === GET_EGRESSO_PROFILE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      egressoDadosAllJobs: action.payload.egressoDadosAllJobs,
      egressoDadosAllGrads: action.payload.egressoDadosAllGrads,
      egressoNome: action.payload.egressoNome,
      egressoListaLocalizacao: action.payload.egressoListaLocalizacao
    }
  }
  //_____________________--______________________---

  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id)

    const { _id, position, company, jobLocation, jobType, status } = job

    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    }
  }

  //_____________________--______________________---
  if (action.type === SET_EDIT_GRAD) {

    const grad = state.userGrads.find((grad) => grad._id === action.payload.id)
    
    const { _id, curso, instituicao, statusGrad, dataInicioGraduacao, dataFimGraduacao } = grad

    return {
      ...state,
      isEditing: true,
      editGradId: _id,
      curso,
      instituicao,
      statusGrad,
      dataInicioGraduacao, 
      dataFimGraduacao
    }
  }

  if (action.type === UPDATE_EDIT_GRAD_JUSTIFICATIVA) {
    return {
      ...state,
      fecharModalJustificativa: false,
    }
  }

  //_____________________--______________________---

  if (action.type === DELETE_JOB_BEGIN) {
    return {...state, isLoading: true}
  }

  //_____________________--______________________---
  if (action.type === DELETE_GRAD_BEGIN) {
    return {...state, isLoading: true}
  }
  //_____________________--______________________---

  if (action.type === EDIT_JOB_BEGIN) {
    return {...state, isLoading: true}
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Experiência de trabalho atualizada!',
    }
  }
  
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  //_____________________--______________________---
  if (action.type === EDIT_GRAD_BEGIN) {
    return {...state, isLoading: true}
  }

  if (action.type === EDIT_GRAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Graduação atualizada!',
    }
  }
  
  if (action.type === EDIT_GRAD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  //_____________________--______________________---

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats
    }
  }
  
  //_____________________--______________________---

  // Todas as graduações
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'Todos',
      sort: 'Recentes',
    }
  }

  // Todas as graduações do usuário
  // Todas as graduações
  if (action.type === CLEAR_USERFILTERS) {
    return {
      ...state,
      searchUser: '',
      searchUserStatus: 'Todos',
      sortUser: 'Recentes',
    }
  }

  if (action.type === CHANGE_PAGE) {
    return {...state, page: action.payload.page}
  }

  throw new Error(`no such action : ${action.type}`)
}


export default reducer