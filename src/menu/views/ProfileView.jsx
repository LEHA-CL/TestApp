import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import mock from "../../@fake-db/mocks";
import axios from "axios";
import { AuthContext } from "../../auth";
import { ActionContext } from "../../context";

export const ProfileView = () => {
  const { accion, setAccion } = useContext(ActionContext);

  const { user } = useContext(AuthContext);

  const [edit, setEdit] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    avatar: "",
  });
  //state para abrir el snackbar
  const [open, setOpen] = useState(false);

  const [usuarioLogin, setUsuarioLogin] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // console.log(file.name)

    //setNewUsuario({ ...newUsuario, avatar: file?.name ? file?.name : "" });

    // Convertir archivo en base 64
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setEdit({ ...edit, avatar: dataURL });
      };
      reader.readAsDataURL(file);
    }
  };

  const getUsuarios = (correo) => {
    try {
      axios.get("/user/login", { data: { correo } }).then(function (response) {
        if (response.status === 200) {
          setUsuarioLogin(response.data?.usuario);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // objeto para enviar los datos a editar.

  // Funcion que se comunica con el endpoint de actualizar.
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .put("/actualizar", edit)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setOpen(true);
            setAccion(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.correo) {
      getUsuarios(user.correo);
    }
  }, []);

  useEffect(() => {
    if (usuarioLogin) {
      setEdit({
        firstName: usuarioLogin.firstName,
        lastName: usuarioLogin.lastName,
        email: usuarioLogin.email,
        userName: usuarioLogin.userName,
        avatar: usuarioLogin.avatar,
      });
    }
  }, [usuarioLogin]);

  useEffect(() => {
    if (user.correo) {
      getUsuarios(user.correo);
    }
  }, []);

  useEffect(() => {
    if (accion) {
      if (user.correo) {
        getUsuarios(user.correo);
        setAccion(false);
      }
    }
  }, [accion]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Card sx={{ mt: 10 }}>
      <CardHeader title="Editar información" />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Avatar
              alt={edit ? edit.firstName : ""}
              sx={{ width: 120, height: 120 }}
              src={edit ? edit.avatar : ""}
            />
          </Box>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={edit.firstName}
                onChange={(e) =>
                  setEdit({ ...edit, firstName: e.target.value })
                }
                label="Nombre"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={edit.lastName}
                onChange={(e) => setEdit({ ...edit, lastName: e.target.value })}
                label="Apellido"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={edit.userName}
                onChange={(e) => setEdit({ ...edit, userName: e.target.value })}
                label="Apodo"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="email"
                required
                label="Email"
                fullWidth
                disabled
                value={edit.email}
              />
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
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </CardActions>
      </form>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        key={"top" + "right"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ zIndex: 999999 }}
      >
        <Alert
          variant="filled"
          elevation={3}
          onClose={handleClose}
          severity="success"
        >
          Datos guardados correctamente
        </Alert>
      </Snackbar>
    </Card>
  );
};
