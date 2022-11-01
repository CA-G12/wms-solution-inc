import { createContext, useState, useReducer, useContext } from 'react';

const AuthContext = createContext<any>({});

const INIT_STATE = {
  auth: {
    loggedIn: false,
    user: null
  }
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { loggedIn, user } = action.payload;

      return {
        ...state,
        auth: {
          loggedIn: true,
          user
        }
      };
    }

    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        auth: {
          loggedIn: true,

          user
        }
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        loggedIn: false,
        user: null
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
