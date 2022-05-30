export function validationForm(inputName) {
  const error = 'Field is empty'
  inputName.forEach(item => {
    item.onblur = function() {
      if(item.value === '') {
        item.nextElementSibling.textContent = error
        item.style.borderColor = 'red'
      }
    }
    item.onfocus = function() {
      item.nextElementSibling.textContent = ''
      item.style.borderColor = ''
    }
  })
}

export function resetForm(inputName) {
  inputName.forEach(item => {
    item.value = ''
    item.nextElementSibling.textContent = ''
    item.style.borderColor = ''
  })
}

export function validationFormAdmin(...field) {
  const error = 'Field is empty'
  field.forEach(item => {
    item.onblur = function() {
      if(item.value === '') {
        item.nextElementSibling.textContent = error
        item.style.borderColor = 'red'
      }
    }
    item.onfocus = function() {
      item.nextElementSibling.textContent = ''
      item.style.borderColor = ''
    }
  })
}