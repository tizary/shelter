import {resetForm, validationFormAdmin} from '../../modules/validation.js'
import {addSkeleton} from '../../modules/skeleton.js'
import {createPageBlock} from '../../modules/pagination.js'

// -------------  cards  -------------
let url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
let numberPets
let numberCard
const friendsList = document.querySelector('.friends-list')
const friendsPages = document.querySelector('.friends-pages')
const idCode = document.querySelector('.id-code')
const petCollection = document.querySelectorAll('.pet-collection')
const activeCollection = document.querySelector('.active-collection')
const inactiveCollection = document.querySelector('.inactive-collection')
const petStatus = document.querySelector('.pet-status')
let totalPages
let page = 1

let startIndex = 0
let endIndex
let curPage

let resizePageBlock = false

if(window.innerWidth >= 1280) {
  numberCard = 8
}
if(window.innerWidth < 1280 && window.innerWidth >= 768) {
  numberCard = 6
}
if(window.innerWidth < 768) {
  numberCard = 3
}
if(window.innerWidth < 520) {
  resizePageBlock = true
}

generatePage(url)
endIndex = startIndex + numberCard
addSkeleton(startIndex, endIndex, friendsList)
generateCard(url, startIndex, endIndex)


window.addEventListener("resize", () => {
  const oldNumberCard = numberCard
  const oldResizePage = resizePageBlock
  if(window.innerWidth >= 1280) {
    numberCard = 8
  }
  if(window.innerWidth >= 768 && window.innerWidth < 1280) {
    numberCard = 6
  }
  if(window.innerWidth < 768) {
    numberCard = 3
    resizePageBlock = false
  }
  if(window.innerWidth < 520) {
    resizePageBlock = true
  }
  if (oldNumberCard !== numberCard) {
    friendsList.innerHTML = ''
    startIndex = 0
    endIndex = numberCard
    addSkeleton(startIndex, endIndex, friendsList)
    generateCard(url, startIndex, endIndex)
    friendsPages.textContent = ""
    generatePage(url)
  }
  if (oldResizePage !== resizePageBlock) {
    friendsPages.textContent = ""
    generatePage(url)
  }
});

async function generateCard(url, startIndex, endIndex) {
  const response = fetch(url)
                      .then(res => res.json())
  const data = await response
  numberPets = data.length
  if(numberPets < endIndex) {
    endIndex = numberPets
  }
  friendsList.innerHTML = ''
  for(let i = startIndex; i < endIndex; i++) {
    const friendsItem = document.createElement('div')
    friendsItem.classList.add('friends-item')
    if(data[i].confirm) {
      friendsItem.classList.add('confirm-pet')
    }
    friendsList.appendChild(friendsItem)
    const img = document.createElement('img')
    img.classList.add('friends-img')
    img.setAttribute('alt', data[i].type)
    if (data[i].imgLink) {
      img.src = data[i].imgLink
      friendsItem.appendChild(img)
    } else {
      img.src = ''
      friendsItem.appendChild(img)
    }

    const p = document.createElement('p')
    p.classList.add('friends-title')
    p.textContent = data[i].name
    friendsItem.appendChild(p)
    const button = document.createElement('button')
    button.classList.add('friends-btn', 'btn')
    button.textContent = 'Learn more'
    friendsItem.appendChild(button)
    const id = document.createElement('div')
    id.classList.add('id-code')
    id.textContent = data[i].id
    friendsItem.appendChild(id)
  }
}


async function generatePage(url) {
  let response = fetch(url)
                      .then(res => res.json())
  let data = await response
  totalPages = Math.ceil(data.length / numberCard)
  createPageBlock(totalPages, 1, resizePageBlock, friendsPages, curPage)
}


function createCardBlock(page) {
  friendsList.innerHTML = ''
  startIndex = page * numberCard - numberCard
  endIndex = page * numberCard
  addSkeleton(startIndex, endIndex, friendsList)
  generateCard(url, startIndex, endIndex)
}

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('current-page')) {
    page = +e.target.textContent
    createPageBlock(totalPages, page, resizePageBlock, friendsPages, curPage)
    createCardBlock(page)
    curPage = page
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('end-page')) {
    page = totalPages
    createPageBlock(totalPages, page, resizePageBlock, friendsPages, curPage)
    createCardBlock(page)
    curPage = page
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('next-page')) {
    if(page < totalPages) {
      page = page + 1
    }
    createPageBlock(totalPages, page, resizePageBlock, friendsPages, curPage)
    createCardBlock(page)
    curPage = page
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('start-page')) {
    page = 1
    createPageBlock(totalPages, page, resizePageBlock, friendsPages, curPage)
    createCardBlock(page)
    curPage = page
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('previous-page')) {
    if(page > 1) {
      page = page - 1
    }
    createPageBlock(totalPages, page, resizePageBlock, friendsPages, curPage)
    createCardBlock(page)
    curPage = page
  }
})


petStatus.addEventListener('click', (e) => {
  if(e.target.classList.contains('pet-collection')) {
    petCollection.forEach(item => {
      item.classList.remove('active-status')
    })
    e.target.classList.add('active-status')
  }
})


function changeCollection(item) {
  let filter
  if(item === activeCollection) {
    filter = true
  } else {
    filter = false
  }
  item.addEventListener('click', () => {
    friendsList.textContent = ''
    url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets?active=${filter}`
    addSkeleton(startIndex, endIndex, friendsList)
    generateFilterElement(url)
    friendsPages.textContent = ""
    generatePage(url)
  })
}

changeCollection(activeCollection)
changeCollection(inactiveCollection)


// -------------- pets-popap &&  confirm-popap----------

const popap = document.querySelector('.pets-popap');
const closePopap = document.querySelector('.close-popap');
const popapImg = document.querySelector('.popap-img');
const popapTitle = document.querySelector('.pets-name');
const petBreed = document.querySelector('.pets-breed');
const petDescription = document.querySelector('.pets-description');
const popapAge = document.querySelector('.popap-age');
const popapInoculations = document.querySelector('.popap-inoculations');
const popapDiseases = document.querySelector('.popap-diseases');
const popapParasites = document.querySelector('.popap-parasites');
const btnsCard = document.querySelector('.btns-card');
const confirmPopap = document.querySelector('.confirm-popap');
const closeConfirm = document.querySelector('.close-confirm-popap');
const confirmImg = document.querySelector('.confirm-img');
const confirmName = document.querySelector('.confirm-name');
const confirmBreed = document.querySelector('.confirm-breed');
const adopterDescription = document.querySelector('.adopter-description');
const idConfirm = document.querySelector('.id-confirm');
const rejectBtn = document.querySelector('.reject-btn');
const deleteInactiveBtn = document.querySelector('.delete-inactive-btn');
const confirmBtn = document.querySelector('.confirm-btn');
const confirmInfoBtn = document.querySelector('.confirm-info-btn');
const status = {}
const confirmStatus = {}
// let petId

function closePopapWindow() {
  popap.classList.toggle('popap-active')
  document.body.classList.toggle('hidden')
}

closePopap.addEventListener('click', closePopapWindow)
closeConfirm.addEventListener('click', closeConfirmPopap)

popap.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('popap-window')) {
    closePopapWindow()
  }
})

confirmPopap.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('popap-window')) {
    closeConfirmPopap()
  }
})

function closeConfirmPopap() {
  confirmPopap.classList.toggle('popap-active')
  document.body.classList.toggle('hidden')
}

friendsList.addEventListener('click', (e) => {
  if(e.target.classList.contains('friends-btn')) {
    const petId = +e.target.nextElementSibling.textContent
    if (activeCollection.classList.contains('active-status')) {
      closePopapWindow()
      popapImg.src = ''
      popapTitle.textContent = ''
      generatePopap(petId)
    } else if(inactiveCollection.classList.contains('active-status')) {
      closeConfirmPopap()
      generateConfirmPopap(petId)
    }
  }
})

async function generatePopap(petId) {
  btnsCard.style.display = 'flex'
  if(activeCollection.classList.contains('active-status')) {
    url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
  } else {
    url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets?active=false`
  }
  const response = fetch(url)
      .then(res => res.json())
  const data = await response
  const curPet = data.find(item => item.id === petId)
  if (curPet.imgLink) {
    popapImg.src = curPet.imgLink
  } else {
    popapImg.src = ''
  }

  popapTitle.textContent = curPet.name
  petBreed.textContent = `${curPet.type} - ${curPet.breed}`
  petDescription.textContent = curPet.description
  popapAge.innerText = curPet.age
  popapInoculations.innerText = curPet.inoculations
  popapDiseases.innerText = curPet.diseases
  popapParasites.innerText = curPet.parasites
  idCode.textContent = curPet.id
}

async function generateConfirmPopap(petId) {
  url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets?active=false`

  const response = fetch(url)
      .then(res => res.json())
  const data = await response
  const curPet = data.find(item => item.id === petId)
  if (curPet.imgLink) {
    confirmImg.src = curPet.imgLink
  } else {
    confirmImg.src = ''
  }
  confirmName.textContent = curPet.name
  confirmBreed.textContent = `${curPet.type} - ${curPet.breed}`
  adopterDescription.textContent = ''
  const firstName = document.createElement('li')
  firstName.classList.add('confirm-item')
  firstName.textContent = curPet.adopterFirstName
  const lastName = document.createElement('li')
  lastName.classList.add('confirm-item')
  lastName.textContent = curPet.adopterLastName
  const email = document.createElement('li')
  email.classList.add('confirm-item')
  email.textContent = curPet.adopterEmail
  adopterDescription.append(firstName, lastName, email)
  idConfirm.textContent = curPet.id
}

deleteInactiveBtn.addEventListener('click', (e) => {
  id = e.target.closest('div').nextElementSibling.textContent
  deletePet(id)
  closeConfirmPopap()
})

rejectBtn.addEventListener('click', (e) => {
  id = e.target.closest('div').nextElementSibling.textContent
  status.active = true
  returnPet(id, status)
  closeConfirmPopap()
})

async function returnPet(id, status) {
  url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets/${id}`
  const response = fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(status)
  })
  const data = await response
  friendsList.textContent = ''
  startIndex = 0
  endIndex = numberCard
  addSkeleton(startIndex, endIndex, friendsList)
  url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets?active=false`
  generateFilterElement(url)
  friendsPages.textContent = ""
  generatePage(url)
}

confirmInfoBtn.addEventListener('click', (e) => {
  id = +e.target.closest('div').nextElementSibling.textContent
  generatePopap(id)
  closePopapWindow()
  btnsCard.style.display = 'none'
})

confirmBtn.addEventListener('click', (e) => {
  id = e.target.closest('div').nextElementSibling.textContent
  confirmStatus.confirm = true
  returnPet(id, confirmStatus) // в данном случае добавляет в API статус true для confirm
  closeConfirmPopap()
})


// -------------- add-popap ------------

const addPopap = document.querySelector('.add-popap')
const addBtn = document.querySelector('.add-btn')
const formInput = document.querySelectorAll('.form-input')
const form = document.querySelector('.add-form')
const addPetBtn = document.querySelector('#add-pet-btn')
const closeBtn = document.querySelector('#close-btn')
const deleteBtn = document.querySelector('.delete-btn')
const updateBtn = document.querySelector('.update-btn')
const addName = document.querySelector('#add-name')
const addType = document.querySelector('#add-type')
const addBreed = document.querySelector('#add-breed')
const addFile = document.querySelector('#add-file')
const updatePopap = document.querySelector('.update-popap')
const updatePetBtn = document.querySelector('#update-pet-btn')
const updateForm = document.querySelector('.update-form')
const formType = document.querySelector('#form-type')
const formName = document.querySelector('#form-name')
const formBreed = document.querySelector('#form-breed')
const formDescription = document.querySelector('#form-description')
const formAge = document.querySelector('#form-age')
const formInoculations = document.querySelector('#form-inoculations')
const formDiseases = document.querySelector('#form-diseases')
const formParasites = document.querySelector('#form-parasites')
const formFile = document.querySelector('#form-file')
const updateCloseBtn = document.querySelector('#update-close-btn')
let id

addBtn.addEventListener('click', () => {
  addPopap.classList.add('popap-active')
  document.body.classList.toggle('hidden')
  resetForm(formInput)
})

function closeAddPopap() {
  addPopap.classList.remove('popap-active')
  document.body.classList.remove('hidden')
}

function closeUpdatePopap() {
  updatePopap.classList.remove('popap-active')
  document.body.classList.remove('hidden')
}

addPopap.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('popap-window')) {
    closeAddPopap()
  }
})

updatePopap.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('popap-window')) {
    closeUpdatePopap()
  }
})

async function addNewPet() {
  url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
  const response = fetch(url, {
    method: 'POST',
    body: new FormData(form)
  })
  const data = await response

  friendsList.textContent = ''
  startIndex = 0
  endIndex = numberCard
  addSkeleton(startIndex, endIndex, friendsList)
  url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
  generateCard(url, startIndex, endIndex)
  friendsPages.textContent = ""
  generatePage(url)
  petCollection.forEach(item => {
    item.classList.remove('active-status')
  })
  activeCollection.classList.add('active-status')
}

async function deletePet(id) {
  url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets/${id}`
  const response = fetch(url, {
    method: 'DELETE'
  })

  const data = await response
  friendsList.textContent = ''
  startIndex = 0
  endIndex = numberCard
  addSkeleton(startIndex, endIndex, friendsList)
  if(activeCollection.classList.contains('active-status')) {
    url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
    generateCard(url, startIndex, endIndex)
  } else {
    url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets?active=false`
    generateFilterElement(url)
  }
  friendsPages.textContent = ""
  generatePage(url)
}

addPetBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const error = 'Field is empty'
  if(addName.value !== '' && addType.value !== '' && addBreed.value !== '' && addFile.value !== '') {
    addNewPet()
    closeAddPopap()
  } else {
    if(addName.value === '') {
      addName.nextElementSibling.textContent = error
      addName.style.borderColor = 'red'
    }
    if(addType.value === '') {
      addType.nextElementSibling.textContent = error
      addType.style.borderColor = 'red'
    }
    if(addBreed.value === '') {
      addBreed.nextElementSibling.textContent = error
      addBreed.style.borderColor = 'red'
    }
    if(addFile.value === '') {
      addFile.nextElementSibling.textContent = error
      addFile.style.borderColor = 'red'
    }
  }
})

validationFormAdmin(addName, addType, addBreed, addFile)

closeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  closeAddPopap()
})

updateCloseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  closeUpdatePopap()
})

deleteBtn.addEventListener('click', (e) => {
  id = e.target.closest('div').nextElementSibling.textContent
  deletePet(id)
  closePopapWindow()
})

async function fillForm(id) {
  const response = fetch(url)
                      .then(res => res.json())
  const data = await response
  data.forEach(item => {
    if(item.id === id){
      formName.value = item.name
      formType.value = item.type
      formBreed.value = item.breed
      formDescription.value = item.description
      formAge.value = item.age
      formInoculations.value = item.inoculations
      formDiseases.value = item.diseases
      formParasites.value = item.parasites
    }
  })
}

updateBtn.addEventListener('click', (e) => {
  id = +e.target.closest('div').nextElementSibling.textContent
  updatePopap.classList.add('popap-active')
  formFile.value = ''
  fillForm(id)
  popap.classList.toggle('popap-active')
})

async function setUpdateInfo(id, info) {
  url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets/${id}`
  const response = fetch(url, {
    method: 'PUT',
    body: info
  })
  const data = await response
}

updatePetBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', formName.value)
    formData.append('type', formType.value)
    formData.append('breed', formBreed.value)
    formData.append('description', formDescription.value)
    formData.append('age', formAge.value)
    formData.append('inoculations', formInoculations.value)
    formData.append('diseases', formDiseases.value)
    formData.append('parasites', formParasites.value)
    if(formFile.files.length === 1) {
      formData = new FormData(updateForm)
    }
    setUpdateInfo(id, formData)
    closeUpdatePopap()
})


// --------------- filter ----------

const currentFilterBlock = document.querySelector('.current-filter-block')
const listType = document.querySelector('.list-type')
const listBreed = document.querySelector('.list-breed')
const filterList = document.querySelectorAll('.filter-list')
const btnReset = document.querySelector('.btn-reset')
const arrType = []

async function generateFilter() {
  let response = fetch(url)
      .then(res => res.json())
  let data = await response

  data.forEach(el => {
    if(arrType.indexOf(el.type) === -1) {
      arrType.push(el.type)
    }
  })

  arrType.forEach(item => {
    const arrBreed = []
    const petNameBlock = document.createElement('div')
    petNameBlock.classList.add('pet-name-block')
    listBreed.appendChild(petNameBlock)
    const petName = document.createElement('span')
    petName.textContent = item
    petName.classList.add('filter-pet-name')
    petNameBlock.appendChild(petName)
    for (let i = 0; i < data.length; i++) {
      if(data[i].type === item && arrBreed.indexOf(data[i].breed) === -1) {
        arrBreed.push(data[i].breed)
        const item = document.createElement('p')
        item.classList.add('list-item')
        item.textContent = data[i].breed
        petNameBlock.appendChild(item)
      }
    }
  })

  arrType.forEach(el => {
    const item = document.createElement('li')
    item.classList.add('list-item')
    item.textContent = el
    listType.appendChild(item)
  })
}

generateFilter()

function displayFilterValue(value, classItem, text) {
  if (value !== null) {
    value.innerHTML = ''
    value.textContent = text
  } else {
    const filterValue = document.createElement('span')
    filterValue.classList.add(classItem)
    filterValue.textContent = text
    currentFilterBlock.appendChild(filterValue)
  }
}

async function generateFilterElement(url) {
  const response = fetch(url)
      .then(res => res.json())
  const data = await response

  startIndex = 0
  if((data.length) < numberCard) {
    endIndex = data.length
  } else {
    endIndex = numberCard
  }
  generateCard(url, startIndex, endIndex)
}

filterList.forEach(item => {
  item.addEventListener('click', (e) => {
    const text = e.target.textContent
    let urlText = e.target.textContent
    if(urlText.indexOf(' ')) {
      urlText = urlText.replace(/ /g, '%20')
    }
    if(item.classList.contains('list-type')) {
      if(url.indexOf('?') === -1) {
        url += `?type=${urlText}`
      } else {
        if(url.indexOf('type') !== -1) {
          url = url.replace(/type=\w+/g, `type=${urlText}`)
        } else {
          url += `&type=${urlText}`
        }
      }

      friendsList.textContent = ''
      addSkeleton(startIndex, endIndex, friendsList)
      generateFilterElement(url)
      friendsPages.textContent = ""
      generatePage(url)

      const currentType = document.querySelector('.current-filter-type')
      displayFilterValue(currentType, 'current-filter-type', text)
    }

    if(item.classList.contains('list-breed')) {
      if(url.indexOf('?') === -1) {
        url += `?breed=${urlText}`
      } else {
        if(url.indexOf('breed') !== -1) {
          url = url.split('%').join('')
          url = url.replace(/breed=\w+/g, `breed=${urlText}`)
        } else {
          url += `&breed=${urlText}`
        }
      }

      friendsList.textContent = ''
      addSkeleton(startIndex, endIndex, friendsList)
      generateFilterElement(url)
      friendsPages.textContent = ""
      generatePage(url)

      const currentBreed = document.querySelector('.current-filter-breed')
      displayFilterValue(currentBreed, 'current-filter-breed', text)
    }
    btnReset.classList.add('btn-visible')
  })
})

btnReset.addEventListener('click', () => {
  btnReset.classList.remove('btn-visible')
  currentFilterBlock.textContent = ''
  friendsList.textContent = ''
  startIndex = 0
  endIndex = numberCard
  addSkeleton(startIndex, endIndex, friendsList)
  if(activeCollection.classList.contains('active-status')) {
    url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
    generateCard(url, startIndex, endIndex)
  } else {
    url = `https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets?active=false`
    generateFilterElement(url)
  }

  friendsPages.textContent = ""
  generatePage(url)
})

