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

  // 30+
  return 'No implementado'
}