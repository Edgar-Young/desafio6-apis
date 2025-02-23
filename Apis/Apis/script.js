const h1 = document.querySelector('h1')
const card = document.querySelector('.card')

// VERSION TODO EN UNA FUNCION
const getApi = async (url) => {
  const res = await fetch(url)
  console.log(res)
  const data = await res.json()
  console.log(data)

  // CARD
  card.innerHTML = `
  <img src="${data.results[0].picture.large}"  alt='foto'/>
  <h1>${data.results[0].name.first}</h1>
  <p>${data.results[0].email}<p/>
  `
}

getApi('https://randomuser.me/api')

// MEJORAR EL CODIGO EN 3 FUNCIONES

/* const body = document.querySelector('body') */

/* const getApi = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  return data
} */

/* const renderDom = (data) => {
  body.innerHTML = `
  <div class="card">
    <img src="${data.results[0].picture.large}" alt="foto">
    <h1>${data.results[0].name.first}</h1>
    <p>${data.results[0].email}</p>
    </div>
    `
}
 */

/* const main = async () => {
  const data = await getApi('https://randomuser.me/api')
  console.log(data)
  renderDom(data)
}
 */
/* main() */

// EJEMPLO CON LA API DE DRAGON BALL

/* const getApi = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

const renderDom = (data) => {
  body.innerHTML = ''
  data.items.forEach(item => {
    body.innerHTML += `
    <div class='card'>
    <img src='${item.image}' width=200px />
    <h1>${item.name}</h1>
    <p>${item.description}</p>
    </div>
    `
  })
}

/* const main = async () => {
  const data = await getApi('https://dragonball-api.com/api/characters')
  console.log(data)
  renderDom(data)
}

main() */

// EJEMPLO CON EL TRY CATCH
/* const getApi = async () => {
  try {
    const res = await fetch('https://randomuser.me/api')
    console.log({ res })
    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

getApi() */

/* const URL_BASE = 'https://dragonball-api.com/api/characters' */

/* const main = async () => {
  try {
    const data = await getApi(URL_BASE)
    renderDom(data)
  } catch (error) {
    console.log(error.message)
  }
} */

// main()

// PARA LA PRUEBA
const obtenerDatosMonedas = async (moneda) => {
  try {
    const valores = await fetch(`https://mindicador.cl/api/${moneda}`) // URL DINAMICA
    const resultados = await valores.json()
    console.log(resultados)
    return resultados
  } catch (error) {
    console.log(error)
  }
}

obtenerDatosMonedas('dolar')
obtenerDatosMonedas('euro')
