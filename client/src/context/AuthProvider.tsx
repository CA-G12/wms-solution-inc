import { createContext, useReducer } from 'react';

const AuthContext = createContext<any>({});

const INIT_STATE = {
  auth: {
    loggedIn: false,
    user: null,
    checkedToken: false
  }
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { loggedIn, user } = action.payload;

      return {
        ...state,
        auth: {
          loggedIn: loggedIn,
          user,
          checkedToken: true
        }
      };
    }

    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        auth: {
          loggedIn: true,
          user,
          checkedToken: true
        }
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        auth: {
          loggedIn: false,
          user: null,
          checkedToken: true
        }
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthProvider = ({ children }: any): any => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
