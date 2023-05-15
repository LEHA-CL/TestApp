import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import mock from "../../@fake-db/mocks";
import { useContext } from "react";
import { ActionContext } from "../../context";
import Swal from "sweetalert2";

/* componente para realizar la eliminación de un usuario */

export const DeleteUsers = ({ selectedRow }) => {


  // Context para manejar el refresh de la tabla
  const { setAccion } = useContext(ActionContext);


  // Funcion para realizar la eliminación de un usuario
  const handleSubmit = () => {
    Swal.fire({
      title: "Eliminar registro",
      text: "¿Está seguro de eliminar el registro seleccionado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0098aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("/delete", { params: { email: selectedRow.email } })
            .then((response) => {
              setAccion(true);
              console.log("Usuario eliminado con éxito:", response.status);
              // Realizar alguna acción adicional si es necesario
            })
            .catch((error) => {
              console.error("Error al eliminar usuario:", error);
              // Realizar alguna acción adicional si es necesario
            });
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <IconButton
        aria-label="capture screenshot"
        color={"error"}
        size="large"
        onClick={handleSubmit}
      >
        <Delete fontSize="small" />
      </IconButton>
    </>
  );
};
