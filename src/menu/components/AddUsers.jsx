import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import mock from "../../@fake-db/mocks";
import axios from "axios";
import { ActionContext } from "../../context";

export const AddUsers = ({ open, togle }) => {
  // State para mostrar snackbar
  const [abrir, setAbrir] = useState(false);

  // Context para menejar el refresh del data grid.
  const { accion, setAccion } = useContext(ActionContext);

  // state para validar si el email existe o no.
  const [validEmail, setValidEmail] = useState(false);

  
  const [enviando, setEnviando] = useState(false);

  //state con el objeto para crear al usuario.
  const [newUsuario, setNewUsuario] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    avatar: "",
  });

  //Funcion para realizar reset algunos states.
  const resetForm = () => {
    setNewUsuario({
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      avatar: "",
    });

    setValidEmail(false);
  };

  // Funcion para cerrar drawer
  const handleClose = () => {
    togle();
    resetForm();
  };


 // Funcion para enviar a endpoint el nuevo usuario.
  const handleSubmit = async (e) => {
    console.log(newUsuario);
    e.preventDefault();
    setEnviando(true);
    try {
      const result = await axios.post(
        "/createUser",
        JSON.stringify(newUsuario)
      );

      if (result?.status === 200) {
        resetForm();
        setEnviando(false);
        setAccion(true);
      } else if (result?.status === 400) {
        setValidEmail(true);
      } else {
        console.log(result);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setValidEmail(true);
        console.log(error);
      }
      setEnviando(false);
    }
  };
 
  //Detectar el archivo cargado
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // console.log(file.name)

    setNewUsuario({ ...newUsuario, avatar: file?.name ? file?.name : "" });

    // Convertir archivo en base 64
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setNewUsuario({ ...newUsuario, avatar: dataURL });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 2,
          paddingTop: 1,
          paddingRight: 2,
          backgroundColor: "#e5e5e5",
        }}
      >
        <Typography variant="h6">
          Agregar Usuario {accion ? " verdadero" : "falso"}
        </Typography>
        <Close
          fontSize="small"
          onClick={handleClose}
          sx={{ cursor: "pointer" }}
        />
      </Box>
      <Box sx={{ p: 5 }}>
       
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={newUsuario?.firstName}
                label="Nombre"
                onChange={(e) =>
                  setNewUsuario({ ...newUsuario, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={newUsuario?.lastName}
                label="Apellido"
                onChange={(e) =>
                  setNewUsuario({ ...newUsuario, lastName: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={newUsuario?.userName}
                label="Apodo"
                onChange={(e) =>
                  setNewUsuario({ ...newUsuario, userName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                required
                label="Email"
                fullWidth
                value={newUsuario?.email}
                onChange={(e) =>
                  setNewUsuario({ ...newUsuario, email: e.target.value })
                }
                error={Boolean(validEmail)}
              />

              {validEmail && (
                <FormHelperText sx={{ color: "error.main" }}>
                  Correo ya existe
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="file-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="contained" component="span">
                  Subir archivo
                </Button>
              </label>
            </Grid>
          </Grid>

          <Box
            sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: "center", mt: 5 }}
          >
            <Button variant="contained" sx={{ mr: 2 }} type="submit">
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};
