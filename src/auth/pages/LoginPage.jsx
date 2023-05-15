import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import mock2 from "../../@fake-db/mocks2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

export const LoginPage = () => {

  //Context para registar el usuario que inicia sesión
  const { login } = useContext(AuthContext);

 // hoook react-router para redireccionar
  const navigate = useNavigate();


  const [correo, setCorreo] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .post("/login", JSON.stringify(correo))
        .then((response) => {
          if (response.status === 200) {
            const { firstName, lastName, email,avatar } =
              response.data.usuarioEncontrado;

            login(firstName, lastName, email,avatar);
            navigate("/menu");
          } else {
            console.log("Credenciales invalidas");
          }
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status === 401) {
            setError(true);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        minHeight: "100vh",
        backgroundColor: "primary.main",
        padding: 4,
      }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{ backgroundColor: "white", padding: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                helperText="Ingrese un email valido"
                value={correo}
                required
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="******"
                fullWidth
                required
              />
            </Grid>

            {error && (
              <FormHelperText sx={{ color: "error.main" }}>
                Credenciales invalidas
              </FormHelperText>
            )}
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
