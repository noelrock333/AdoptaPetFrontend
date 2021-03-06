function toggleMenu() {
  var menu = document.querySelector('#myTopnav')
  menu.classList.toggle('responsive')
}

function renderPet(pet) {
  return `<div class="pet">
      <h4>${pet.nombre}</h4>
      <img src="${pet.foto}" alt="">
      <div class="location">
        <span>Ubicación: ${pet.ubicacion}</span>
      </div>
      <button data-id="${pet.id}" data-test="soy un test">Adoptame</button>
    </div>`
}

var petsCart = [];
if (window.localStorage.getItem('storedCart')) {
  petsCart = JSON.parse(window.localStorage.getItem('storedCart'))
}

var evaluacion = (2 == 2) ? true : false

function addPetToCart(event) {
  petsCart.push(event.target.dataset.id)
  
  var cartCounter = document.querySelector('#cart_counter')
  cartCounter.innerHTML = petsCart.length
  window.localStorage.setItem('storedCart', JSON.stringify(petsCart))
}

function createPet(event) {
  event.preventDefault()
  
  var formData = new FormData()
  formData.set('nombre', 'Noel')
  formData.set('ubicacion', 'Puebla 123, Colima, Colima')
  formData.set('foto', 'https://www.nationalgeographic.com.es/medio/2019/11/18/un-perro-de-la-raza-labrador-retriever_bfcf74f1_800x800.jpg')
  
  fetch('http://59d559a3c74d.ngrok.io/v1/mascotas', {
    method: 'POST',
    body: formData
  }).then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
}

function getPetListPromise() {
  console.log('getPetListPromise()')
  return new Promise((resolve, reject) => {
    fetch('http://59d559a3c74d.ngrok.io/v1/mascotas', {
      method: 'GET'
    })
    .then((data) => data.json())
    .then((data) => {
      console.log(data)
      resolve(data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

document.addEventListener('DOMContentLoaded', async function() {
  var burguerMenu = document.querySelector('#burguer_menu')
  burguerMenu.addEventListener('click', toggleMenu)

  var petsListDOM = document.querySelector('#pets_list')
  if (petsListDOM) {
    try {
      var petListHTTP = await getPetListPromise()
      petListHTTP.forEach(pet => {
        petsListDOM.insertAdjacentHTML('beforeend', renderPet(pet));
      })
      
      document.querySelectorAll('.pet button').forEach(buttonDOM => {
        buttonDOM.addEventListener('click', addPetToCart)
      })
    } catch (error) {
      console.log(error)
    }

    // var petsList = [
    //   { id: '0001', nombre: 'Pepito', ubicacion: 'Fresno 123, Los Pinos, Ciudad de México', foto: 'https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/kraken_generic_max_width_960/public/Purina%C2%AE%20caracteristicas%20de%20pastor%20aleman.jpg?itok=zjNMgVUO' },
    //   { id: '0002', nombre: 'Jacinto', ubicacion: 'Siempre viva 123, Springfield', foto: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg' },
    //   { id: '0003', nombre: 'Roky', ubicacion: 'Siempre viva 123, Springfield', foto: 'https://www.nationalgeographic.com.es/medio/2020/09/29/estoy-aqui-abajo_dfcabae6_2000x1333.jpg' },
    //   { id: '0004', nombre: 'Boby', ubicacion: 'Siempre viva 123, Springfield', foto: 'https://www.nationalgeographic.com.es/medio/2019/11/18/un-perro-de-la-raza-labrador-retriever_bfcf74f1_800x800.jpg' }
    // ]
  }

  var cartCounter = document.querySelector('#cart_counter')
  cartCounter.innerHTML = petsCart.length

  // var formDOM = document.querySelector('#new-pet-form')
  // if (formDOM) {
  //   formDOM.addEventListener('submit', createPet)
  // }

})