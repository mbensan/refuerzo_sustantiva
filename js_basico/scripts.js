const pepsi = {
  nombre: 'Pepsi sin Azúcar',
  precio: 1750,
  id: 5
}
const margarina = {
  nombre: 'Margarina Belmont',
  precio: 2000,
  id: 67
}
const leche = {
  nombre: 'Colún Semidescremada',
  precio: 1050,
  id: 102
}

function calcular_total() {
  const suma = CARRO.suma()

  const total = document.querySelector('#total')

  total.innerHTML = `Lleva un total de $${suma} pesos`
}

function agregar_prod(nuevo_producto) {
  // 1. Cambio el carrito
  CARRO.agregar_prod(nuevo_producto)
  // 2. Cambio el DOM
  const lista = document.querySelector('#lista')
  lista.innerHTML += `<li>${nuevo_producto.nombre} ($${nuevo_producto.precio}) </li>`
}
// CARRO DE COMPRAS
// agregar producto, eliminar producto, ver total de costo
const CARRO = {
  productos: [],
  agregar_prod: function (nuevo_producto) {
    this.productos.push(nuevo_producto)
  },
  eliminar_producto: function (cod_producto) {

    // 1. Creamos un arreglo de los productos filtrados
    const filtrados = []
    // 2. Iteramos los productos actuales
    for (let i=0; i<this.productos.length; i++) {
      const producto = this.productos[i]
      if (producto.id != cod_producto) {
        filtrados.push(producto)
      }
    }
    // 3. Reemplazamos los productos actuales por los productos filtrados
    this.productos = filtrados

    //this.productos = this.productos.filter(x => x.id != cod_producto)
  },
  suma: function () {
    let total = 0
    for (let producto of this.productos) {
      total = total + producto.precio
    }
    return total
  },
  fecha: {
    dia: '2023-02-06',
    hora: '20:03',
    gmt: -4
  }
}

const brutos = [
  ['Alex', 1400000],
  ['Sofia', 2000000],
  ['Joaco', 1000000],
  ['Abril', 3200000]
]

function calcular_liquidos(sueldos) {
  // 1. Defino una matriz de respuesta
  const liquidos = []

  // 2. Hago los cálculos
  for (let i=0; i < sueldos.length; i++) {
    const nombre = sueldos[i][0]
    const sueldo_bruto = sueldos[i][1]
    // 2.5 Calcular sueldo líquido
    const sueldo_liquido = sueldo_bruto * 0.83
    const nueva_fila = [nombre, sueldo_liquido]
    liquidos.push(nueva_fila)
  }

  // 3. Retorno la matriz ya calculada
  return liquidos
}

function tablero(num) {
  // algo
  return [
    ['A1', 'A2', ..., 'A8'],
    ['B1', 'B2', ..., 'B8'],
    ...
    ['F1', 'F2', ..., 'F8'],
  ]
}