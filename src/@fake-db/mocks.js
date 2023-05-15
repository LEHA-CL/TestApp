import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { usersData } from "./data";

const mock = new MockAdapter(axios);

function miFuncion() {
  if (localStorage.getItem("miBandera")) {
    return;
  }

  // Resto del código de la función
  localStorage.setItem("usuarios", JSON.stringify(usersData));
  localStorage.setItem("miBandera", true);
}

miFuncion();
mock.onGet("/users").reply(() => {
  try {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    return [200, { usuarios }];
  } catch (error) {
    console.log("Error en el mock:", error);

    return [500, { error }];
  }
});

// end point para traer la información del usuario logeado
mock.onGet("/user/login").reply((config) => {
  try {
    const { correo } = JSON.parse(config.data);

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const usuario = usuarios.find(
      (user) => user.email?.toLowerCase() === correo?.toLowerCase()
    );

    if (usuario) {
      return [200, { usuario }];
    } else {
      return [404, { mensaje: "Usuario no encontrado" }];
    }
  } catch (error) {
    console.log("Error en el mock:", error);
    return [500, { error }];
  }
});
/* mock2.onGet("/users").reply(200, {
  usuarios: JSON.parse(localStorage.getItem("usuarios")),
});
 */

//end point para el inicio de sesión
mock.onPost("/login").reply((config) => {
  try {
    const correo = JSON.parse(config.data);
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    /*  const correoEncontrado = usuarios.some(
      (usuario) => usuario.email.toLowerCase() === correo.toLowerCase()
    ); */

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email.toLowerCase() === correo.toLowerCase()
    );

    if (usuarioEncontrado) {
      return [200, { success: true, usuarioEncontrado }];
    } else {
      return [401, { success: true }];
    }
  } catch (error) {
    console.log("Error en el mock:", error);
    return [500, { error }];
  }
});
//end point para actualizar un usuario.
mock.onPut("/actualizar").reply((config) => {
  try {
    const { email, firstName, lastName, userName, avatar } = JSON.parse(config.data);
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const index = usuarios.findIndex(
      (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
    );

    if (index !== -1) {
      usuarios[index].firstName = firstName;
      usuarios[index].lastName = lastName;
      usuarios[index].userName = userName;
      usuarios[index].avatar   = avatar;

      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      return [200, { success: true, message: "Usuario Actualizado" }];
    } else {
      return [404, { success: false, message: "Usuario no encontrado" }];
    }
  } catch (error) {
    console.log("Error en el mock:", error);
    return [500, { error }];
  }
});

//Endpoint para borrar un nuevo usuario.

mock.onDelete("/delete").reply((config) => {

  try
  {
    const { email } = config.params;
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    // Eliminar usuario de la lista
    const indice = usuarios.findIndex(
      (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
    );
    if (indice !== -1) {
      usuarios.splice(indice, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return [204];
    } else {
      return [404];
    }
  }
  catch(error)
  {
    console.log("Error en el mock:", error);
    return [500, { error }];
  }

  
});

// EndPoint  para crear un nuevo usuario.

mock.onPost("/createUser").reply((config) => {
  try {
    const newUser = JSON.parse(config.data);
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const emailExists = usuarios.some(
      (usuario) => usuario.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (emailExists) {
      return [
        400,
        { success: false, message: "El correo electrónico ya existe" },
      ];
    }

    usuarios.push(newUser);

    localStorage.removeItem("usuarios");

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return [
      200,
      { success: true, message: "Usuario creado con éxito", newUser },
    ];
  } catch (e) {
    return [500, { success: false, message: e, newUser }];
  }
});

export default mock;
