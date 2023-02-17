const table = document.querySelector('#personajes')

localStorage.removeItem('personajes')

async function cargar () {
  console.log('cargando....');
  let personajes = localStorage.getItem('personajes')
  if (personajes) {
    personajes = JSON.parse(personajes)
    console.log('Cargado desde Local Storage');
  }
  else {
    personajes = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10')
    personajes = await personajes.json()
    console.log('Cargados desde la API');
    localStorage.setItem('personajes', JSON.stringify(personajes))
  }

  llenarDOM(personajes)
}

function llenarDOM(personajes) {
  let html = ''
  personajes.map(personaje => {
    html += `
      <tr>
        <td>${personaje.id}</td>
        <td>${personaje.name}</td>
        <td>${personaje.species}</td>
        <td><img class="img" src="${personaje.image}" ></td>
      </tr>
    `
  })
  table.innerHTML = html
}