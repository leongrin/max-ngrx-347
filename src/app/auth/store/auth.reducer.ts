import {User} from '../user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case '':
      return {
      };

    default:
      console.log('INSIDE default');
      return state
  }
}
