import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { usersData } from "./data";

const mock2 = new MockAdapter(axios);

function miFuncion() {
  if (localStorage.getItem("miBandera")) {
    return;
  }

  // Resto del código de la función
  localStorage.setItem("usuarios", JSON.stringify(usersData));
  localStorage.setItem("miBandera", true);
}

miFuncion();
mock2.onGet("/users").reply(() => {
  try {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    return [200, { usuarios }];
  } catch (error) {
    console.log("Error en el mock:", error);

    return [500, { error }];
  }
});

/* mock2.onGet("/users").reply(200, {
  usuarios: JSON.parse(localStorage.getItem("usuarios")),
});
 */
mock2.onPost("/login").reply((config) => {
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
});

mock2.onPut("/actualizar").reply((config) => {
  const { email, firstName,lastName,userName } = JSON.parse(config.data);
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  const index = usuarios.findIndex(
    (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
  );

  if (index !== -1) {
    usuarios[index].firstName = firstName;
    usuarios[index].lastName = lastName;
    usuarios[index].userName = userName;


    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return [200, { success: true, message: "Usuario Actualizado" }];
  } else {
    return [404, { success: false, message: "Usuario no encontrado" }];
  }
});

mock2.onDelete("/delete").reply((config) => {
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
});

mock2.onPost("/createUser").reply((config) => {
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

    localStorage.removeItem('usuarios')

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return [
      200,
      { success: true, message: "Usuario creado con éxito", newUser },
    ];
  } catch (e) {
    return [500, { success: false, message: e, newUser }];
  }
});

export default mock2;
