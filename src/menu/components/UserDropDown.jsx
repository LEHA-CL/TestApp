// ** React Imports
import { useState, SyntheticEvent, Fragment, useContext, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { EditAttributesOutlined, LogoutOutlined } from "@mui/icons-material";
import { AuthContext } from "../../auth";
import { useNavigate } from "react-router-dom";
import mock from "../../@fake-db/mocks";
import axios from "axios";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState();
  // ** States
  const [anchorEl, setAnchorEl] = useState(null);

  // ** Vars
  const direction = "ltr";

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url) => {
    setAnchorEl(null);
  };

  //Funcion para cerrar sesión del usuario.
  const handleLogout = () => {
    logout();

    navigate("/auth/login", { replace: true });
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

  useEffect(() => {
    if(user)
    {
      getUsuarios(user.correo)
    }
  
   
  }, [])
  

  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          alt={usuarioLogin? usuarioLogin.firstName : ''}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={usuarioLogin ? usuarioLogin.avatar : ''}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 240, mt: 1 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar
                alt={usuarioLogin? usuarioLogin.firstName : ''}
                src={usuarioLogin? usuarioLogin.avatar : ''}
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                ml: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600 }}
              >{`${usuarioLogin ? usuarioLogin.firstName : ''} ${usuarioLogin ? usuarioLogin.lastName : ''}`}</Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {usuarioLogin ? usuarioLogin.email : ''}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={()=> navigate('/user/edit-profile')}>
          <EditAttributesOutlined
            sx={{ mr: 2, fontSize: "1.375rem", color: "text.secondary" }}
          />
          Perfil
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutOutlined
            sx={{ mr: 2, fontSize: "1.375rem", color: "text.secondary" }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
