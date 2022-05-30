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