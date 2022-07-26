const boton = document.getElementById("boton")

const nombre = document.getElementById("nombre")
const precio = document.getElementById("precio")
const stock = document.getElementById("stock")
const descripcion = document.getElementById("descripcion")
const thumbnail = document.getElementById("thumbnail")

boton.addEventListener('click', async (e) => {
    e.preventDefault();
    const params = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify({
            nombre: nombre.value,
            precio: precio.value,
            thumbnail: thumbnail.value,
            descripcion:descripcion.value,
            stock:stock.value,
        })
  }
  nombre.value = precio.value = stock.value = descripcion.value = thumbnail.value = ''
  
  await fetch('http://localhost:8080/api/productos/', params)

})


