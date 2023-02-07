// 4! = 4*3*2*1
// 7! = 7*6*5*4*3*2*1
// 1456! = 1456*1455.....*3*2*1

function fact(num) {
  // caso base
  if (num == 1) {
    return 1
  }
  // caso iterativo
  let res = 1
  for (let i=2; i<=num; ++i) {
    res = res * i
  }

  return res
}

// funcion recursiva
function fact2(num) {
  // caso base
  if (num <= 1) {
    return 1
  }
  // caso recursivo
  return num * fact2(num - 1)
}

// 4 => "cuatro", 35 => "treinta y cinco"
// 152 => "ciento cincuenta y dos" 
function num2str(num) {
  if (num <= 15) {
    const primeros = ['cero', 'uno', 'dos', 'tres', 'cuatro',
    'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce',
    'trece', 'catorce', 'quince']

    return primeros[num]
  }
  // los dieci-algo
  else if (num <= 19) {
    const unidades = num - 10
    return 'dieci' + num2str(unidades)
  }
  // 'veinte'
  else if (num == 20) {
    return 'veinte'
  }
  // veinti-algo
  else if (num <= 29) {
    const unidades = num - 20
    return 'veinti' + num2str(unidades)
  }
  // 30+ algo-y-algo  78
  else if (num <= 99) {
    const decenas = Math.floor(num/10)
    const unidades = num - (decenas * 10)

    decenas_str = ['', '', '', 'treinta', 'cuarenta',
    'cincuenta', 'sesenta', 'setenta', 'ochenta',
    'noventa'][decenas]
    
    if (unidades == 0) {
      return decenas_str
    }
    return decenas_str + ' y ' + num2str(unidades)
  }
  else if (num == 100) {
    return 'cien'
  }
  // 101 - 999 cientos-algo 567
  else if (num <= 999) {
    const centenas = Math.floor(num / 100)
    const resto = num - (centenas * 100)
    
    const centenas_str = ['', 'ciento', 'doscientos',
    'trescientos', 'cuatrocientos', 'quinientos',
    'seiscientos', 'setecientos', 'ochocientos',
    'novecientos'][centenas]

    return centenas_str + ' ' + num2str(resto)
  }
  else if (num == 1000) {
    return 'mil'
  }
  else if (num <= 1999) {
    const miles = Math.floor(num / 1000)
    const resto = num - (miles * 1000)
    return 'mil ' + num2str(resto)
  }
  else if (num <= 999999) {
    const miles = Math.floor(num / 1000)
    const resto = num - (miles * 1000)
  
    return num2str(miles) + ' mil ' + num2str(resto)
  }
  return 'No implementado'
}

const form = document.querySelector('#form_num2str')

form.addEventListener('submit', function (ev) {
  // evitamos que formulario se envie (y recargue la página)
  ev.preventDefault()

  // obtenemos el valor del input#num, pero como integer
  let num = document.querySelector('#num').value
  num = parseInt(num)

  // lo trasformamos a string
  const str = num2str(num)

  // lo escribimos en el DOM
  document.querySelector('#str').innerHTML = str
})