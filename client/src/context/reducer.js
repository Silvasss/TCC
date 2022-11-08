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

import { initialState } from './appContext'


const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
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
      alertText: 'User Profile Updated!',
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
      jobType: 'full-time',
      status: 'Pendente',
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
      alertText: 'New Job Created!',
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
      alertText: 'New Grad Created!',
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
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
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
      alertText: 'Job Updated!',
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
      alertText: 'Grad Updated!',
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
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'todos',
      searchType: 'todos',
      sort: 'ultimo',
    }
  }

  if (action.type === CHANGE_PAGE) {
    return {...state, page: action.payload.page}
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer