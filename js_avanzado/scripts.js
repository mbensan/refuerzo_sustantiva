{
  const h3 = document.querySelector('#saludo')
  const nombre = 'Mauricio'
  const nuevo_saludo = `Mucho gusto ${nombre}`
  h3.innerText = nuevo_saludo
}

const form = document.querySelector('#form_personaje')
const input_id = document.querySelector('#id')
const datos = document.querySelector('#datos')
const name = document.querySelector('#name')

// USANDO CALLBACKS
/*
form.addEventListener('submit', function (ev) {
  // 1. Prevengo que se envie el formulario
  ev.preventDefault()
  // 2. Obtengo el ID del usuario
  const id = input_id.value

  console.log('Previo a la llamada');
  // 3. Realizamos la llamada a la API (CALLBACK HELL)
  $.get('https://swapi.dev/api/people/' + id, function(personaje) {
    console.log(personaje);
    $.get(personaje.homeworld, function (planeta) {
      console.log(planeta);
      $.get(personaje.films[0], function(pelicula) {
        console.log(pelicula);
        dibujarDOM(personaje, planeta, pelicula)
      })
    })
  })
  console.log('Terminada la llamada');
})
*/

// USANDO PROMESAS (FETCH)
form.addEventListener('submit', async function (ev) {
  // 1. Prevengo que se envie el formulario
  ev.preventDefault()
  // 2. Obtengo el ID del usuario
  const id = input_id.value

  console.log('Previo a la llamada');
  // 3. Realizamos la llamada a la API (CALLBACK HELL)
  let personaje = await fetch('https://swapi.dev/api/people/' + id)
  personaje = await personaje.json()

  let planeta = await fetch(personaje.homeworld)
  planeta = await planeta.json()

  let pelicula = await fetch(personaje.films[0])
  pelicula = await pelicula.json()
  
  dibujarDOM(personaje, planeta, pelicula)

  console.log('Terminada la llamada');
  
})

function dibujarDOM(personaje, planeta, pelicula) {
  name.innerText = personaje.name
  datos.innerHTML = ''
  datos.innerHTML += `<li>Planeta Natal: <b>${planeta.name}</b></li>`
  datos.innerHTML += `<li>Primera Película: ${pelicula.title}</b></li>`
}

function get_pos () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function ({coords}) {
      resolve(coords)
    })
  })
}

async function init() {
  const coords = await get_pos()
  const ubicacion = document.querySelector('#ubicacion')
  ubicacion.innerHTML = `Usted está en las coordenadas ${coords.latitude} ${coords.longitude}`
}
init()



