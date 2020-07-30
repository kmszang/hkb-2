export function validateId(target: HTMLInputElement) {
  if (!target.value.length) {
    return false
  }
  return true
}

export function validatePassword(target: HTMLInputElement) {
  const firstPassword = target.value
  if (!firstPassword.length) {
    return false
  }
  const $secondPassword = target
    .closest('div')
    .nextElementSibling.querySelector('input')

  const secondPassword = $secondPassword.value
  const $validatePasswordError = $secondPassword.nextElementSibling

  if (firstPassword !== secondPassword) {
    $validatePasswordError.classList.add('visible')
  } else {
    $validatePasswordError.classList.remove('visible')
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
      const $errorElement = inputs[i].nextElementSibling
      $errorElement.classList.add('visible')
      return inputs[i].focus()
    }

    if (inputs[i].name === 'passwordCheck') {
      const firstPassword = inputs[i - 1].value
      const secondPassword = inputs[i].value
      if (firstPassword !== secondPassword) {
        return inputs[i].select()
      }
    }

    body[inputs[i].name] = inputs[i].value
  }
  return body
}

export function validateName(target: HTMLInputElement) {
  if (!target.value.length) {
    return false
  }
  return true
}
