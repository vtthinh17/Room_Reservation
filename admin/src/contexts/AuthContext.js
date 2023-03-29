import { createContext, useEffect, useReducer } from "react";
import AuthConstant from "../constant/AuthConstant";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case AuthConstant.LOGIN_START:
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case AuthConstant.LOGIN_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case AuthConstant.LOGIN_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case AuthConstant.LOGIN_LOGOUT:
      console.log("Logout executed");
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    console.log(state.user);
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};