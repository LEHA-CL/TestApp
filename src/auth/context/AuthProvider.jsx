import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { types } from "../types/types";

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return {
    logged : !!user,
    user :user,
  }
}
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (firstName = '',lastName = '',correo = "",avatar = "") => {

    const user = {id:'ABC', firstName,lastName,correo,avatar}

    const action = {
      type: types.login,
      payload: user
    };

    localStorage.setItem('user',JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('miBandera');
    const action = {type: types.logout}

    dispatch(action);

  }


  return (
    <AuthContext.Provider
      value={{
        ...authState,


        //metodos
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
