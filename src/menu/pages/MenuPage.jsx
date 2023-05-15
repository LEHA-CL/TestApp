import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import React from "react";

import { MenuLayout } from '../layout/MenuLayout';
import { UsuariosView } from '../views';


export const MenuPage = () => {
  return (
    <>
      <MenuLayout>
        <UsuariosView/> 
        {/* <NoteView /> */}
      </MenuLayout>
    </>
  );
};
