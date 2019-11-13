import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const USER_FAILURE = 'USER_FAILURE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const userFailure = error => ({type: USER_FAILURE, error})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, isGuest) => async dispatch => {
  let res
  try {
    if (isGuest) {
      res = await axios.post(`/auth/${method}`, {email, password, isGuest})
    } else {
      res = await axios.post(`/auth/${method}`, {email, password})
    }
    dispatch(getUser(res.data || defaultUser))
    history.push('/home')
  } catch (authError) {
    dispatch(userFailure(authError.response.data))
  }
}

export const sessionChecker = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/auth/restore')
      //console.log('TCL: session checker datadata', data)
      if (!data) {
        console.log('user not found/created')
      }

      dispatch(getUser(data))
    } catch (error) {
      console.error(error)
      console.log('messed up in sessionChecker')
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

//If no error, update the info in the database via the endpoint;
//If there's an error, then we reject the password change;

export const resetPassword = ({userId, currentPassword, newPassword}) => () => {
  try {
    return axios.put(`/api/users/reset-password/${userId}`, {
      currentPassword,
      newPassword
    })
  } catch (err) {
    return Promise.reject()
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case USER_FAILURE:
      return {...state, error: action.error}
    default:
      return state
  }
}
