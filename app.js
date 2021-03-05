// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_topnav
function toggleMenu() {
  var menu = document.querySelector('#myTopnav');
  if (!menu.classList.contains('responsive')) {
    menu.classList.add('responsive');
  } else {
    menu.classList.remove('responsive')
  }
}

function renderPetTemplate(pet) {
  const petTemplate = `<div class="pet">
      <h4>${pet.name}</h4>
      <img src="${pet.photoUrls.pop()}" alt="">
      <div class="location">
        <span>Ubicación: Fresno 123, Los Pinos, Ciudad de México</span>
      </div>
      <button data-id="${pet.id}">Adoptame</button>
    </div>`;
  return petTemplate;
}

function renderPets(petsList) {
  var petsListDOM = document.querySelector('#pets_list');
  petsList.forEach((pet) => {
    petsListDOM.insertAdjacentHTML('beforeend', renderPetTemplate(pet));
  });
}

// function addPetToCart(event) {
//   let petsCart = window.localStorage.getItem('storedCart') ? JSON.parse(window.localStorage.getItem('storedCart')) : [];
//   petsCart = [...petsCart, event.target.dataset.id];
//   window.localStorage.setItem('storedCart', JSON.stringify(petsCart));
//   document.querySelector('#cart_counter').innerHTML = petsCart.length;
// }

document.addEventListener('DOMContentLoaded', function() {
  // const petsCart = window.localStorage.getItem('storedCart') ? JSON.parse(window.localStorage.getItem('storedCart')) : [];
  // document.querySelector('#cart_counter').innerHTML = petsCart.length;
  var petsList = [
    {
      "id": 9222968140497303194,
      "category": {
          "id": 0,
          "name": "string"
      },
      "name": "doggie",
      "photoUrls": [
          "https://cdn.sentidoanimal.es/wp-content/uploads/2020/01/HuskySiberiano.jpeg"
      ],
      "tags": [
          {
              "id": 0,
              "name": "string"
          }
      ],
      "status": "available"
  },
  {
      "id": 9222968140497303195,
      "category": {
          "id": 0,
          "name": "string"
      },
      "name": "doggie",
      "photoUrls": [
          "https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg"
      ],
      "tags": [
          {
              "id": 0,
              "name": "string"
          }
      ],
      "status": "available"
  },
  ]
  renderPets(petsList)
  
  const petButtons = document.querySelectorAll('.pet button')
  petButtons.forEach(button => {
    button.addEventListener('click', addPetToCart)
  })
});