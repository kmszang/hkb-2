export function validateId(target: HTMLInputElement) {
  if (!target.value.length) {
    return false
  }
  return true
}

export function validatePassword(target: HTMLInputElement) {
  if (!target.value.length) {
    return false
  }
  return true
}

export function validatePasswordOverlap(target: HTMLInputElement) {
  const firstPasswordBox = target
    .closest('div')
    .previousElementSibling.querySelector('input')

  const firstPassword = firstPasswordBox.value
  const secondPassword = target.value

  if (firstPassword !== secondPassword) {
    return false
  }
  return true
}

export function checkAndmakeInputData(inputs) {
  const body = {}
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value.length) {
      inputs[i].nextElementSibling.classList.add('visible')
      return inputs[i].focus()
    }

    inputs.forEach((input) => {
      body[input.name] = input.value
    })
  }
  return body
}

export function validateName(target: HTMLInputElement) {
  if (!target.value.length) {
    return false
  }
  return true
}
