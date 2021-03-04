
import * as Type from '../types'
let token = '';//localStorage.getItem('token');
let auth = '';//localStorage.getItem('auth');
const initialState = auth ? { loggedIn: true, auth, token } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case Type.POST_LOGIN_SUCCESS:
      return {
        loggingIn: true,
        auth: action.auth,
        token: action.token
      };
      case Type.POST_REGISTER_SUCCESS:
        return {
          auth: action.auth,
          token: action.token
        };
    default:
      return state
  }
}