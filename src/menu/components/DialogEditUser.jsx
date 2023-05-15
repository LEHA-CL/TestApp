// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useContext } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

// ** Icons Imports
import { CloseOutlined, Edit } from "@mui/icons-material";
import axios from "axios";
import mock from "../../@fake-db/mocks";
import { Alert, Snackbar } from "@mui/material";
import { ActionContext } from "../../context";


// Modal para editar la información del usuario

export const DialogEditUser = ({ selectedRow }) => {
  // ** States

  //Context para manejar el refresh de la tabla.
  const { setAccion } = useContext(ActionContext);

  //state para abrir el snackbar
  const [open, setOpen] = useState(false);

  //state para abrir el modal
  const [show, setShow] = useState(false);

  // objeto para enviar los datos a editar.
  const [edit, setEdit] = useState({
    firstName: selectedRow.firstName,
    lastName: selectedRow.lastName,
    email: selectedRow.email,
    userName: selectedRow.userName,
    avatar : selectedRow.avatar
  });

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


  // Cerrar el snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="capture screenshot"
        color={"info"}
        size="large"
        onClick={() => setShow(true)}
      >
        <Edit fontSize="small" />
      </IconButton>

      <Dialog
        fullWidth
        open={show}
        maxWidth="md"
        scroll="body"
        onClose={() => setShow(false)}
        // TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <form onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              pb: 6,
              px: { xs: 8, sm: 15 },
              pt: { xs: 8, sm: 12.5 },
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              onClick={() => setShow(false)}
              sx={{ position: "absolute", right: "1rem", top: "1rem" }}
            >
              <CloseOutlined />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                Editar información del usuario
              </Typography>
            </Box>

            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  value={edit.firstName}
                  label="Nombre"
                  onChange={(e) =>
                    setEdit({ ...edit, firstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  value={edit.lastName}
                  label="Apellido"
                  onChange={(e) =>
                    setEdit({ ...edit, lastName: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={edit.userName}
                  label="Apodo"
                  onChange={(e) =>
                    setEdit({ ...edit, userName: e.target.value })
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  disabled
                  fullWidth
                  value={edit.email}
                  onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              color="success"
              sx={{ mr: 2 }}
              type="submit"
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShow(false)}
            >
              Cancelar
            </Button>
          </DialogActions>
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
      </Dialog>
    </>
  );
};
