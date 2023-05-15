import React from "react";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";
import { AuthProvider } from "./auth";
import { ActionProvider } from "./context";

export const MenuApp = () => {
  return (
    <>
      <AuthProvider>
        <ActionProvider>
          <AppTheme>
            <AppRouter />
          </AppTheme>
        </ActionProvider>
      </AuthProvider>
    </>
  );
};
