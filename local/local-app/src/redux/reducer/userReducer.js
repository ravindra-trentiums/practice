
import * as Type from '../types'
const initialState = {
  user: undefined,
  token: undefined,
};
export function authentication(state = initialState, action) {
  switch (action.type) {
    case Type.POST_LOGIN_SUCCESS:
      state = {
        ...state,
        token: action.payload.data.token
      }
      return state
    case Type.POST_REGISTER_SUCCESS:
      state = {
        ...state,
        token: action.payload.data.token
      }
      return state
    case Type.USER_LOGOUT:
      state={
        ...state,
        token:''
      }
    default:
      return state
  }
}