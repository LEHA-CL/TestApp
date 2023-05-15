import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Toolbar, DialogEditUser, DeleteUsers } from "../components";

import axios from "axios";
import mock from "../../@fake-db/mocks";
import { AddUsers } from "../components/AddUsers";
import { ActionContext } from "../../context";
import { obtenerIniciales } from "../../helpers/obtenerIniciales";

// ** funcion para renderizar el avatar en el caso contrario mostrar las iniciales.
const renderClient = (params) => {
  const { row } = params;
  const stateNum = Math.floor(Math.random() * 6);
  const states = [
    "success",
    "error",
    "warning",
    "info",
    "primary",
    "secondary",
  ];
  const color = states[stateNum];

  if (row.avatar) {
    return (
      <Avatar
        src={`${row.avatar}`}
        sx={{ mr: 3, width: "1.875rem", height: "1.875rem" }}
      />
    );
  } else {
    return (
      <Avatar
        skin="light"
        color={color}
        sx={{ mr: 3, fontSize: ".8rem", width: "1.875rem", height: "1.875rem" }}
      >
        {obtenerIniciales(row.firstName ? row.firstName : "")}
      </Avatar>
    );
  }
};

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
/*
        firstName: "nombre1",
        lastName: "apellido1",
        email: "email1",
        userName: "username1",
        avatar: "abcd.jpg"

*/
const columns = [
  {
    flex: 0.1,
    minWidth: 0.40,
    field: "avatar",
    headerName: "Avatar",
    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
           {renderClient(params)}
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 290,
    field: "firstName",
    headerName: "Nombre",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.firstName}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Apellido",
    field: "lastName",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.lastName}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Email",
    field: "email",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.email}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Apodo",
    field: "userName",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.userName}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Acciones",
    field: "acciones",
    filterable: false,
    renderCell: (params) => {
      const { row } = params;
      return (
        <Box>
          <DialogEditUser selectedRow={row} />
          <DeleteUsers selectedRow={row} />
        </Box>
      );
    },
  },
];

export const UsuariosView = () => {

  //Context para manejar el refresh de la tabla.
  const { accion, setAccion } = useContext(ActionContext); 

  const [addUserOpen, setAddUserOpen] = useState(false);

  //State para llenar la tabla con datos.
  const [usuarios, setUsuarios] = useState([]);

  const [pageSize, setPageSize] = useState(20);

  // state con las coincidencias a buscar.
  const [searchText, setSearchText] = useState("");

  //Data filtrada en el buscado
  const [filteredData, setFilteredData] = useState([]);

  // Abrir drawer para añadir un nuevo usuario.
  const toggleAddUser = () => setAddUserOpen(!addUserOpen);

  //traer usuario.
  const getUsuarios = () => {
    try {
      axios.get("/users").then(function (response) {
        if (response.status === 200) {
          console.log(response);
          setUsuarios(response.data?.usuarios);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion que filtra los datos con las coincidencias escritas
  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = usuarios.filter((row) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field]);
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  // Refresh a la tabla cuando se ejecuta alguna accion (edit, create, update)
  useEffect(() => {
    if (accion) {
      getUsuarios(); // Volver a cargar los usuarios cuando "accion" cambie
      setAccion(false);
    }
  }, [accion]);

  return (
    <>
      <Card sx={{mt:10}}>
        <CardHeader title="Lista Usuarios" />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 3 }}>
          <Button sx={{ mb: 2 }} onClick={toggleAddUser} variant="contained">
            Nuevo Usuario
          </Button>
        </Box>

        <CardContent>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            autoHeight
            getRowId={(row) => row.email}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[20, 50]}
            components={{ Toolbar: Toolbar }}
            rows={filteredData.length ? filteredData : usuarios}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            componentsProps={{
              toolbar: {
                value: searchText,
                clearSearch: () => handleSearch(""),
                onChange: (event) => handleSearch(event.target.value),
              },
            }}
          />
        </CardContent>
      </Card>

      <AddUsers open={addUserOpen} togle={toggleAddUser} />
    </>
  );
};
