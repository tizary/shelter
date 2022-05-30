import {validationForm, resetForm} from '../../modules/validation.js'

// -------- burger menu -------

const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('.burger');
const linkOpen = document.querySelector('.modal-list');
const body = document.body;

modalOpen.addEventListener('click', () => {
  modalOpen.classList.toggle('burger-active');
  modal.classList.toggle('modal-close');
  body.classList.toggle('hidden');
});

linkOpen.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal-link')) {
    modal.classList.add('modal-close');
    modalOpen.classList.toggle('burger-active');
  }

});

// -------------  cards  -------------
let url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
let numberPets
let numberCard
const friendsList = document.querySelector('.friends-list')
const friendsPages = document.querySelector('.friends-pages')
let totalPages

let startIndex = 0
let endIndex

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
generateCard(url, startIndex, endIndex)


window.addEventListener("resize", () => {
  const oldNumberCard = numberCard

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
  endIndex = numberCard
  if (oldNumberCard !== numberCard) {
    friendsList.innerHTML = ''
    startIndex = 0
    endIndex = numberCard
    generateCard(url, startIndex, endIndex)
    friendsPages.textContent = ""
    generatePage(url)
  }
});

async function generateCard(url, startIndex, endIndex) {
  let response = fetch(url)
                      .then(res => res.json())
  let data = await response
  numberPets = data.length
  if(numberPets < endIndex) {
    endIndex = numberPets
  }
  for(let i = startIndex; i < endIndex; i++) {
    const friendsItem = document.createElement('div')
    friendsItem.classList.add('friends-item')
    friendsList.appendChild(friendsItem)
    const img = document.createElement('img')
    img.classList.add('friends-img')
    if (data[i].imgLink) {
      img.setAttribute('alt', data[i].type)
      img.src = data[i].imgLink
    } else {
      img.src = ''
    }
    friendsItem.appendChild(img)
    const p = document.createElement('p')
    p.classList.add('friends-title')
    p.textContent = data[i].name
    friendsItem.appendChild(p)
    const button = document.createElement('button')
    button.classList.add('friends-btn', 'btn')
    button.textContent = 'Learn more'
    friendsItem.appendChild(button)
    const idCode = document.createElement('div')
    idCode.classList.add('id-code')
    idCode.textContent = data[i].id
    friendsItem.appendChild(idCode)
  }
}

async function generatePage(url) {
  let response = fetch(url)
                      .then(res => res.json())
  let data = await response
  console.log(data)
  totalPages = Math.ceil(data.length / numberCard)

  createPageBlock(totalPages, 1)
}


  let page = 1

function createPageBlock(totalPages, page) {
  let elemPage = ''
  let activePage

  let beforePages = page - 1
  let afterPages = page + 1
  let impossibleBtn

  if(page === 1) {
    impossibleBtn = 'impossible'
  } else {
    impossibleBtn = ''
  }

  elemPage += `<h4 class="start-page circle ${impossibleBtn}" >&lt;&lt;</h4>`
  if(page > 1) {
    elemPage += `<h4 class="previous-page circle ${impossibleBtn}">&lt;</h4>`
  } else {
    elemPage += `<h4 class="previous-page circle ${impossibleBtn}">&lt;</h4>`
  }


  if(page == totalPages && beforePages > 0) {
    beforePages = beforePages - 1
  }

  if(page == 1) {
    afterPages = afterPages + 1
  }

  if(resizePageBlock === false) {
    for(let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
      if (pageLength > totalPages) {
        continue
      }
      if(pageLength == 0) {
        pageLength = pageLength + 1
      }
      if(page == pageLength) {
        activePage = 'active-page'
      } else {
        activePage = ''
      }
      elemPage +=  `<h4 class="current-page circle ${activePage}">${pageLength}</h4>`
    }
  } else {
    elemPage +=  `<h4 class="current-page circle active-page">${page}</h4>`
  }

  if(page === totalPages) {
    impossibleBtn = 'impossible'
  } else {
    impossibleBtn = ''
  }

  if(page < totalPages) {
    elemPage += `<h4 class="next-page circle ${impossibleBtn}">&gt;</h4>`
  } else {
    elemPage += `<h4 class="next-page circle ${impossibleBtn}">&gt;</h4>`
  }
  elemPage += `<h4 class="end-page circle ${impossibleBtn}">&gt;&gt;</h4>`

  friendsPages.innerHTML = elemPage
}

function createCardBlock(page) {
  friendsList.innerHTML = ''
  startIndex = page * numberCard - numberCard
  endIndex = page * numberCard
  generateCard(url, startIndex, endIndex)
}

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('current-page')) {
    page = +e.target.textContent
    createPageBlock(totalPages, page)
    createCardBlock(page)
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('end-page')) {
    page = totalPages
    createPageBlock(totalPages, page)
    createCardBlock(page)
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('next-page')) {
    if(page < totalPages) {
      page = page + 1
    }
    createPageBlock(totalPages, page)
    createCardBlock(page)
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('start-page')) {
    page = 1
    createPageBlock(totalPages, page)
    createCardBlock(page)
  }
})

friendsPages.addEventListener('click', (e) => {
  if(e.target.classList.contains('previous-page')) {
    if(page > 1) {
      page = page - 1
    }
    createPageBlock(totalPages, page)
    createCardBlock(page)
  }
})


// -------------- popap ----------

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
let petId

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

friendsList.addEventListener('click', (e) => {
  if(e.target.classList.contains('friends-btn')) {
    popap.classList.toggle('popap-active')
    document.body.classList.toggle('hidden')
    petId = +e.target.nextSibling.textContent
    console.log(petId)
    popapImg.src = ''
    popapTitle.textContent = ''
    generatePopap(petId)
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

  popapTitle.textContent = curPet.name
  petBreed.textContent = `${curPet.type} - ${curPet.breed}`
  petDescription.textContent = curPet.description
  popapAge.innerText = curPet.age
  popapInoculations.innerText = curPet.inoculations
  popapDiseases.innerText = curPet.diseases
  popapParasites.innerText = curPet.parasites
}

// ----------------- adopt-popap

const adoptPopap = document.querySelector('.adopt-popap')
const adoptPetBtn = document.querySelector('#adopt-pet-btn')
const firstname = document.querySelector('#firstname')
const lastname = document.querySelector('#lastname')
const email = document.querySelector('#email')
const petsBtn = document.querySelector('.pets-btn')
const formInput = document.querySelectorAll('.form-input')
const adoptInfo = {}

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

petsBtn.addEventListener('click', (e) => {
  closePopap()
  adoptPopap.classList.add('popap-active')
  document.body.classList.toggle('hidden')
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

  friendsList.innerHTML = ''
  startIndex = 0
  endIndex = numberCard
  url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
  generateCard(url, startIndex, endIndex)
  friendsPages.textContent = ""
  generatePage(url)
}

adoptPetBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const error = 'Field is empty'
  if(firstname.value !== '' && lastname.value !== '' && email.value !== '') {
    adoptInfo.adopterFirstName = firstname.value
    adoptInfo.adopterLastName = lastname.value
    adoptInfo.adopterEmail = email.value
    adoptInfo.active = false
    setClient(petId, adoptInfo)
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
  let response = fetch(url)
      .then(res => res.json())
  let data = await response

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
      console.log(url)

      friendsList.textContent = ''
      friendsPages.textContent = ''

      generateFilterElement(url)
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

      console.log(url)

      friendsList.textContent = ''
      friendsPages.textContent = ""
      generateFilterElement(url)
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
  url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/4/po/pets'
  friendsList.textContent = ''
  startIndex = 0
  endIndex = numberCard
  generateCard(url, startIndex, endIndex)
  friendsPages.textContent = ""
  generatePage(url)
})