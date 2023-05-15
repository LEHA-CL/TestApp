import { useState } from "react";
import { ActionContext } from "./ActionContext";
export const ActionProvider = ({ children }) => {

    
  const [accion, setAccion] = useState(false);

  return (
    <ActionContext.Provider
      value={{
        accion,
        setAccion,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
