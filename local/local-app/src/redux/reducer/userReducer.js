
import * as Type from '../types'
const initialState = {
  user: undefined,
  token: undefined,
  blog: undefined,
};
export function authentication(state = initialState, action) {
  switch (action.type) {
    case Type.POST_LOGIN_SUCCESS:
      state = {
        ...state,
        token: action.payload.data.token
      }
      return state
    case Type.USER_LOGOUT:
      state = {
        ...state,
        token: ''
      }
      return state
    case Type.GET_BLOG_SUCCESS:
      console.log(action.payload)
      state = {
        ...state,
        blog: action.payload
      }
      return state
    default:
      return state
  }
}