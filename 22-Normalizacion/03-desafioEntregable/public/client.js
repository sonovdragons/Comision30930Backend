import {denormalizeData} from './normalizer.js'

///////////////////////////Socket//////////////////
const socket = io();
socket.emit('allProducts');
socket.emit('allMsgs');

socket.on('producto', (unProducto) => {
  attachRow(unProducto);
});
socket.on('mensaje', (mensajes) => {
  console.log(mensajes);

	console.log('denormalized data');
	const denormalizedData = denormalizeData(mensajes)
  console.log(denormalizedData);

  nvoMensaje(denormalizedData);
});

/////////////////////mensajes////////////////////////////////
const boxMensajes = document.getElementById('messages')
const btnMensajes = document.getElementById("btnMensajes")
const mensaje = document.getElementById('mensaje')
const email= document.getElementById('email')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const edad = document.getElementById('edad')
const alias = document.getElementById('alias')
const avatar = document.getElementById('avatar')


const nvoMensaje = (array) => {
  array.forEach(elem => {
    const fila = document.createElement('div');
  fila.innerHTML = `<img class="avatar" src="${elem.author.avatar}"/>
                    <strong id="author">${elem.author.alias}</strong> 
                    <em id="msg">${elem.text}</em>`;

  boxMensajes.appendChild(fila);
  });
};

btnMensajes.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const data = {
      email: email.value,
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      alias: alias.value,
      avatar: avatar.value,
      mensaje: mensaje.value
    };

    const url = 'http://localhost:8080/api/mensajes';
    response = await postData(url, data);
    mensaje.value = '';
  } catch (err) {
    console.log(err);
  }
});

/////////////////////productos////////////////////////////////
const botonGuardarProducto = document.getElementById("botonGuardarProducto")
const precio = document.getElementById('precio')
const nombreProd = document.getElementById('nombreProd')
const thumbnail = document.getElementById('thumbnail')
const tabla = document.getElementById('tableContent')

const attachRow = (elem) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `<td><img id="img" class="imgTabla" src="${elem.thumbnail}" alt=""></td>
                      <td id="id">${elem.id}</td>
                      <td id="nombre">${elem.nombre}</td>
                      <td id="nombre">${elem.precio}</td>`;

  tabla.appendChild(fila);
};

botonGuardarProducto.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const data = {
      nombre: nombreProd.value,
      precio: precio.value,
      thumbnail: thumbnail.value
    };

    const url = 'http://localhost:8080/api/productos';
    response = await postData(url, data);

     precio.value = '', nombreProd.value = '', thumbnail.value = '';
  } catch (err) {
    console.log(err);
  }
});


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}