// 1 Declara una funcion getAllBreeds que devuelva todas las razas de perro.

function getAllBreeds() {
  return fetch("https://dog.ceo/api/breeds/list/all") //getAllBreeds().then(data=>console.log(data))
    .then((res) => res.json())
    .then((breeds) => Object.keys(breeds.message));
}

// 2 Declara una función getRandomDog que obtenga una imagen random de una raza.

function getRandomDog() {
  return fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => data.message);
}

// 3 Declara una función getAllImagesByBreed que obtenga todas las imágenes de una raza Komondor.
function getAllImagesByBreed() {
  return fetch("https://dog.ceo/api/breed/komondor/images")
    .then((res) => res.json())
    .then((data) => data.message);
}

// 4 Declara una funcion getAllImagesByBreed2(breed) que devuelva las imágenes de la raza pasada por el argumento

function getAllImagesByBreed2(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then((res) => res.json())
    .then((data) => data.message);
}

// 5 Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github a partir de su
//nombre de usuario. (https://api.github.com/users/{username}).
function getGitHubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((user) => user);
}
// 6 Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un
//usuario(username), retorne { img, name } y pinte la foto y el nombre en el DOM.

/* function printGithubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      let img = profile.avatar_url;
      let name = profile.name;
      return { name: name, img: img };
    });
} */

function printGithubUserProfile(username) {
  // solución vista en clase
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((user) => {
      document.body.innerHTML += `
              <img src="${user.avatar_url}">
               <p>${user.name}</p>`;

      return { img: user.avatar_url, name: user.name };
    });
}

// 7 Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para obtener
//información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo,
//la estructura debe ser exactamente la misma:

/* <section>
    <img src="url de imagen" alt="imagen de usuario">
    <h1>Nombre de usuario</h1>
    <p>Public repos: (número de repos)</p>
</section> */
function getAndPrintGitHubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((usuario) => {
      let img = usuario.avatar_url;
      let name = usuario.name;
      let num = usuario.public_repos;

      return `<section>
                        <img src="${img}" alt="${name}">
                        <h1>${name}</h1>
                        <p>Public repos: ${num}</p>
                    </section>`;
    });
}

// 8 Manipulación del DOM: Crea un input de tipo texto, y un botón buscar.
//El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar.
// Después llamaremos a la función getAndPrintGitHubUserProfile(username)
//que se ejecute cuando se pulse el botón buscar.(Esto no se testea).

/* Boton en HTML


<h2>Buscar usuario GitHub</h2>
      <input id="user" type="text">
      <button id="buscar">Try it</button>
      <div id="github_user"></div>*/

/* function getAndPrintGitHubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      return `<section>
                   <img src="${user.avatar_url}" alt="imagen de usuario">
                   <h1>${user.name}</h1>
                   <p>Public repos: ${user.public_repos}</p>
                 </section>`;
    });
}

//getAndPrintGitHubUserProfile("AdrianTerciado").then(data=>console.log(data))

document.getElementById("buscar").addEventListener("click", function () {
  // Alert con el texto del input
  alert(document.getElementById("user").value);
  const name = document.getElementById("user").value;

  getAndPrintGitHubUserProfile(name).then(
    (data) => (document.getElementById("github_user").innerHTML = data)
  );
});
 */

// 9 Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames) que utilice
//'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.
// Objetivo: Usar Promise.all()
// Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
// Pregunta. ¿cuántas promesas tendremos?
// Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

// Pasos:

// Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
// Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
// Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de cada usuario.
//Consigue que se imprima por consola el nombre de cada usuario.

function fetchGithubUsers(userNames) {
  let arr = userNames.map((user) => {
    return fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((username) => {
        console.log(username.name);
        return username;
      });
  });
  return Promise.all(arr);
}

// Solucion chef y refactorizacion
function fetchGithubUsers(userNames) {
  // [user1,user2]
  return Promise.all(
    userNames.map((user) =>
      fetch(`https://api.github.com/users/${user}`).then((res) => res.json())
    )
  ).then((dataUsers) => {
    dataUsers.forEach((user) => console.log(user.login));
    return dataUsers;
  });
}

fetchGithubUsers(["RLVM13", "2Tucho"]).then((data) =>
  console.log(data.map((user) => user.login))
);
