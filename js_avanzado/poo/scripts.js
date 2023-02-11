class Vehiculo {
  constructor (mm, modelo, rend) {
    // atributos
    this.marca = mm
    this.modelo = modelo
    this.rendimiento = rend
  }
  // métodos
  consumo (kms) {
    return Math.round(kms / this.rendimiento)
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, rend, num_asientos) {
    super(marca, modelo, rend)
    // lo específico de la Autos
    this.num_asientos = num_asientos
  }
}

class Camion extends Vehiculo {
  constructor(marca, modelo, rend, carga) {
    super(marca, modelo, rend)
    // lo específico de la Autos
    this.carga = carga
  }
  testear (kgs) {
    return kgs <= this.carga
  }
  consumo (kms, cargado=false) {
    if (!cargado) {
      return super.consumo(kms)
    }
    return super.consumo(kms) * 1.3
  }
}



const v16 = new Auto('Nissan', 'V16', 14)
const prisma = new Auto('Chevrolet', 'Prisma', 11)
const ranger = new Auto('Ford', 'Ranger', 7)

const autos = [v16, prisma, ranger]

const form = document.querySelector('#form')
const origen = document.querySelector('#origen')
const destino = document.querySelector('#destino')
const vehiculo_select = document.querySelector('#vehiculo')

const resultado = document.querySelector('#resultado')

form.addEventListener('submit', function(ev) {
  ev.preventDefault()

  distancia = Math.abs(parseInt(origen.value) - parseInt(destino.value))

  let vehiculo;
  if (vehiculo_select.value == 'v16') {
    vehiculo = v16
  }
  else if (vehiculo_select.value == 'prisma') {
    vehiculo = prisma
  }
  else if (vehiculo_select.value == 'ranger') {
    vehiculo = ranger
  }
  else  {
    throw 'Vehículo no existe'
  }

  const mensaje = `Usted consumirá ${vehiculo.consumo(distancia)} litros de combustible`
  resultado.innerHTML = mensaje
})
