import {validationForm, resetForm} from '../../modules/validation.js'

const adminName = 'admin'
const adminPassword = 'admin'



// -------- menu -------

const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('.burger');
const linkOpen = document.querySelector('.modal-list');
const logo = document.querySelector('.logo');
const body = document.body;

function closeModal() {
  modalOpen.classList.toggle('burger-active');
  modal.classList.toggle('modal-close');
  body.classList.toggle('hidden');
}

modalOpen.addEventListener('click', () => {
  closeModal();
});

logo.addEventListener('click', (e) => {
  if (e.target.classList.contains('header-title')) {
    closeModal();
  }
})

linkOpen.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal-link')) {
    closeModal();
  }
});

modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-layer')) {
    closeModal();
  }
});


// ----------- slider ----------
let url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'

const btnLeft = document.querySelector(".arrow-left")
const btnRight = document.querySelector(".arrow-right")
const sliderList = document.querySelector(".slider-list")
const itemLeft = document.querySelector("#item-left")
const itemRight = document.querySelector("#item-right")
const itemActive = document.querySelector("#item-active")

let numberPets

async function generateSlider(item, startNumber, endNumber) {
  url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'

  let response = fetch(url)
                      .then(res => res.json())
  let data = await response
  numberPets = data.length

  for(let i=startNumber; i <= endNumber; i++) {
    const card = document.createElement('div')
    card.classList.add('slider-item')
    item.appendChild(card)
    const img = document.createElement('img')
    img.classList.add('slider-img')
    if (data[i].imgLink) {
      img.src = data[i].imgLink
    } else {
      img.src = ''
    }
    img.setAttribute('alt', data[i].type)
    card.appendChild(img)
    const title = document.createElement('p')
    title.classList.add('slider-title')
    title.textContent = data[i].name
    card.appendChild(title)
    const btn = document.createElement('button')
    btn.classList.add('btn', 'slider-btn')
    btn.textContent = 'Learn more'
    card.appendChild(btn)
    const id = document.createElement('div')
    id.classList.add('id-code')
    id.textContent = data[i].id
    card.appendChild(id)
  }
}

function useSliderSize() {
  if(window.innerWidth >= 1280) {
    generateSlider(itemLeft, 0, 2)
    generateSlider(itemActive, 3, 5)
    generateSlider(itemRight, 6, 8)
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    generateSlider(itemLeft, 0, 1)
    generateSlider(itemActive, 2, 3)
    generateSlider(itemRight, 4, 5)
  } else {
    generateSlider(itemLeft, 0, 0)
    generateSlider(itemActive, 1, 1)
    generateSlider(itemRight, 2, 2)
  }
}

useSliderSize()

let activeArr = [0,1,2]

btnLeft.addEventListener('click', () => {
    sliderList.classList.add('transition-left')
})

btnRight.addEventListener('click', () => {
  sliderList.classList.add('transition-right')
})

const randomCard = () => {
  const random = Math.floor(Math.random() * numberPets)
  return random
}

sliderList.addEventListener('animationend', (event) => {

  if(event.animationName === 'move-left') {
    sliderList.classList.remove('transition-left')
    const leftItems = itemLeft.innerHTML
    document.querySelector('#item-active').innerHTML = leftItems

    const randomArr = []
    for (let i = 0; i < 3; i++) {
      let random = randomCard()
      if(randomArr.indexOf(random) === -1 && activeArr[0] !== random && activeArr[1] !== random && activeArr[2] !== random) {
        randomArr.push(random)
      } else {
        i--
      }
    }
    activeArr = [...randomArr]
    createNewCard(itemLeft, randomArr)

  } else {
    sliderList.classList.remove('transition-right')
    const rightItems = itemRight.innerHTML
    document.querySelector('#item-active').innerHTML = rightItems

    const randomArr = []
    for (let i = 0; i < 3; i++) {
      let random = randomCard()
      if(randomArr.indexOf(random) === -1 && activeArr[0] !== random && activeArr[1] !== random && activeArr[2] !== random) {
        randomArr.push(random)
      } else {
        i--
      }
    }
    activeArr = [...randomArr]
    createNewCard(itemRight, randomArr)
  }
})

async function createNewCard(item, arr) {
  let response = fetch(url)
                      .then(res => res.json())
  let data = await response
  item.innerHTML = ''
  let indexCard
  if(window.innerWidth >= 1280) {
    indexCard = 3
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    indexCard = 2
  } else {
    indexCard = 1
  }
  for(let i=0; i < indexCard; i++) {
    const card = document.createElement('div')
    card.classList.add('slider-item')
    item.appendChild(card)
    const img = document.createElement('img')
    img.classList.add('slider-img')
    if (data[arr[i]].imgLink) {
      img.src = data[arr[i]].imgLink
    } else {
      img.src = ''
    }
    // img.src = data[arr[i]].imgLink
    img.setAttribute('alt', data[arr[i]].type)
    card.appendChild(img)
    const title = document.createElement('p')
    title.classList.add('slider-title')
    title.textContent = data[arr[i]].name
    card.appendChild(title)
    const btn = document.createElement('button')
    btn.classList.add('btn', 'slider-btn')
    btn.textContent = 'Learn more'
    card.appendChild(btn)
    const id = document.createElement('div')
    id.classList.add('id-code')
    id.textContent = data[arr[i]].id
    card.appendChild(id)
  }
}



// -------------- pets-popap ----------


const popap = document.querySelector('.pets-popap');
const closeBtn = document.querySelector('.close-btn');
const popapImg = document.querySelector('.popap-img');
const popapTitle = document.querySelector('.pets-name');
const petBreed = document.querySelector('.pets-breed');
const petDescription = document.querySelector('.pets-description');
const popapAge = document.querySelector('.popap-age');
const popapInoculations = document.querySelector('.popap-inoculations');
const popapDiseases = document.querySelector('.popap-diseases');
const popapParasites = document.querySelector('.popap-parasites');
const idCode = document.querySelector('.id-code')
let petCurrentId

function closePopap() {
  popap.classList.remove('popap-active')
  document.body.classList.remove('hidden')
}

popap.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('popap-window')) {
    closePopap()
  }
})

closeBtn.addEventListener('click', closePopap)

itemActive.addEventListener('click', (e) => {
  if(e.target.classList.contains('slider-btn')) {
    popap.classList.add('popap-active')
    document.body.classList.add('hidden')
    petCurrentId = +e.target.nextSibling.textContent
    popapImg.src = ''
    popapTitle.textContent = ''
    generatePopap(petCurrentId)
  }
})

async function generatePopap(petId) {
  let response = fetch(url)
      .then(res => res.json())
  let data = await response
  const curPet = data.find(item => item.id === petId)
  if (curPet.imgLink) {
    popapImg.src = curPet.imgLink
  } else {
    popapImg.src = ''
  }
  // popapImg.src = curPet.imgLink
  popapTitle.textContent = curPet.name
  petBreed.textContent = `${curPet.type} - ${curPet.breed}`
  petDescription.textContent = curPet.description
  popapAge.innerText = curPet.age
  popapInoculations.innerText = curPet.inoculations
  popapDiseases.innerText = curPet.diseases
  popapParasites.innerText = curPet.parasites
  idCode.textContent = curPet.id
}


// -------------- adopt-popap ------------

const adoptPopap = document.querySelector('.adopt-popap')
const adoptPetBtn = document.querySelector('#adopt-pet-btn')
const firstname = document.querySelector('#firstname')
const lastname = document.querySelector('#lastname')
const email = document.querySelector('#email')
const petsBtn = document.querySelector('.pets-btn')
const formInput = document.querySelectorAll('.form-input')
const adoptInfo = {}

petsBtn.addEventListener('click', (e) => {
  popap.classList.remove('popap-active')
  adoptPopap.classList.add('popap-active')
})

async function setClient(id, info) {
  url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets/${id}`
  const response = fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  })
  const data = await response
  itemActive.innerHTML = ''
  itemLeft.innerHTML = ''
  itemRight.innerHTML = ''
  useSliderSize()
}

adoptPetBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const error = 'Field is empty'
  if(firstname.value !== '' && lastname.value !== '' && email.value !== '') {
    adoptInfo.adopterFirstName = firstname.value
    adoptInfo.adopterLastName = lastname.value
    adoptInfo.adopterEmail = email.value
    adoptInfo.active = false
    setClient(petCurrentId, adoptInfo)
    closeAdoptPopap()
  } else {
    if(firstname.value === '') {
      firstname.nextElementSibling.textContent = error
      firstname.style.borderColor = 'red'
    }
    if(lastname.value === '') {
      lastname.nextElementSibling.textContent = error
      lastname.style.borderColor = 'red'
    }
    if(email.value === '') {
      email.nextElementSibling.textContent = error
      email.style.borderColor = 'red'
    }
  }
})

validationForm(formInput)

function closeAdoptPopap() {
  adoptPopap.classList.remove('popap-active')
  document.body.classList.toggle('hidden')
  resetForm(formInput)
}

adoptPopap.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('popap-window')) {
    closeAdoptPopap()
  }
})

// ------------- login-popap -------------------

const loginBtn = document.querySelector('.login-btn')
const loginPopap = document.querySelector('.login-popap')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginSubmit = document.querySelector('#log-in')
const loginInput = document.querySelectorAll('.login-input')



loginBtn.addEventListener('click', () => {
  loginPopap.classList.add('popap-active')
  document.body.classList.toggle('hidden')
})

function closeLoginPopap() {
  loginPopap.classList.remove('popap-active')
  document.body.classList.toggle('hidden')
  // username.value = ''
  // password.value = ''
}

loginPopap.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('popap-window')) {
    closeLoginPopap()
    resetForm(loginInput)
  }
})

loginSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  const error = 'Field is empty'
  if(username.value === adminName && password.value === adminPassword) {
    const curUrl = document.location.href
    const numberSlice = curUrl.indexOf('main')
    location.href = curUrl.slice(0, numberSlice) + 'admin/admin.html';
  }  else {

    if(username.value === '') {
      username.nextElementSibling.textContent = error
      username.style.borderColor = 'red'
    }
    if(password.value === '') {
      password.nextElementSibling.textContent = error
      password.style.borderColor = 'red'
    }
  }
})

validationForm(loginInput)



