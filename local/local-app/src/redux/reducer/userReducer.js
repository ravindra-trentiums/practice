
import * as Type from '../types'
const initialState = {
  user: undefined,
  token: undefined,
};
export function authentication(state = initialState, action) {
  switch (action.type) {
    case Type.POST_LOGIN_SUCCESS:
      console.log(action.payload.data.user)
      const { token } = action.payload.data.user;
      return { token, user: undefined };
    case Type.POST_REGISTER_SUCCESS:
      return {
        auth: action.auth,
        token: action.token
      };
    default:
      return state
  }
}