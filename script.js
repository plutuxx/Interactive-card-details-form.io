const formSide = document.getElementById('form-side')
const cardName = document.getElementById('card-name')
const cardNumber = document.getElementById('card-number')
const cardDate = document.getElementById('card-date').children
const cardCVC = document.getElementById('card-cvc')
const cardNameDesign = document.getElementById('card-name-design')
const cardNumberDesign = document.getElementById('card-number-design')
const cardDateDesign = document.getElementById('card-date-design').children
const cardCVCDesign = document.getElementById('card-cvc-design')
const confirmButton = document.getElementById('confirm-btn')
const error = document.getElementsByClassName('error-text')
const textRegex = /^[a-zA-Z- ]+$/;
let hasError = false
// Select all input elements with type "number"
const numberInputs = document.querySelectorAll('input[type="number"]');
// For revent arrow key up and down from changing the input value
numberInputs.forEach(function (input) {
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  });
});

// Function to check if an element is focused
function isFocused(element) {
  return (
    element === document.activeElement
  )
}

// Function to show error messages
function showError(index, text, element) {

  if (Array.isArray(element) === true) {
    element.forEach((element) => {
      element.style.borderColor = 'hsl(0, 100%, 66%)';
    })
    error[index].innerText = text
    error[index].style.opacity = '1'
  } else {
    error[index].innerText = text
    error[index].style.opacity = '1'
    element.style.borderColor = 'hsl(0, 100%, 66%)';
  }

}

// Function to hide error messages
function hideError(index, element, textGetHide) {

  if (textGetHide === true) {
    element.style.borderColor = '';
  } else if (Array.isArray(element) === true) {
    element.forEach((element) => {
      element.style.borderColor = '';
    })
    error[index].innerText = ''
    error[index].style.opacity = '0'
  } else {
    error[index].innerText = ''
    error[index].style.opacity = '0'
    element.style.borderColor = '';
  }

}

cardName.addEventListener('input', () => {
  let textCheck = textRegex.test(cardName.value)

  if (cardName.value === '') {
    showError(0, 'Not valied', cardName)
  } else if (textCheck === false && cardName.value !== '') {
    showError(0, 'Not valied', cardName)
  } else {
    hideError(0, cardName)
  }

  if (cardName.value !== '' && textCheck === true) {
    cardNameDesign.innerHTML = cardName.value
  } else {
    cardNameDesign.innerHTML = 'Jane Appleseed'
  }

})

cardName.addEventListener('blur', () => {
  let textCheck = textRegex.test(cardName.value)

  if (cardName.value === '') {
    showError(0, "Can't be blank", cardName)
  } else if (textCheck === false) {
    showError(0, 'Not valied', cardName)
  } else {
    hideError(0, cardName)
  }
})

cardNumber.addEventListener('input', function (e) {
  let trimmedValue = e.target.value.replace(/\s/g, ''); // Remove existing spaces
  trimmedValue = trimmedValue.replace(/\D/g, ''); // Remove non-digit characters

  if (trimmedValue.length > 16) {
    trimmedValue = trimmedValue.slice(0, 16); // Limit to 16 characters
  }

  //Categorize numbers with four-digit categories
  let formattedValue = '';
  for (let i = 0; i < trimmedValue.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += ' ' + trimmedValue.charAt(i);
    } else {
      formattedValue += trimmedValue.charAt(i);
    }
  }
  cardNumber.value = formattedValue;

  if (cardNumber.value.length += 1) {
    hideError(1, cardNumber)
  }

  if (cardNumber.value !== '') {
    cardNumberDesign.innerHTML = cardNumber.value
  } else {
    cardNumberDesign.innerHTML = '0000 0000 0000 0000'
  }

});

cardNumber.addEventListener('blur', () => {

  switch (cardNumber.value) {
    case '':
      showError(1, "Can't be blank", cardNumber)
      break;

    default:
      if (cardNumber.value.length < 19) {
        showError(1, 'Not valied', cardNumber)
      } else {
        hideError(1, cardNumber)
      }
  }
})

cardDate[0].addEventListener('input', function () {
  // Remove non-numeric characters and 'e' or 'E' from the input value
  this.value = this.value.replace(/[eE]/g, '');
  if (cardDate[0].value.length > 1) {
    cardDate[0].value = cardDate[0].value.slice(0, 2);
  }

  switch (cardDate[0].value) {
    case '':
      if (cardDate[1].value === '') {
        hideError(2, [cardDate[0], cardDate[1]])
      } else {
        hideError(2, cardDate[0], true)
      }
      break;

    default:
      if (cardDate[0].value > 12) {
        showError(2, "Not valied", cardDate[0])
      } else if (cardDate[0].value <= 12) {
        hideError(2, cardDate[0])
      }

  }

  if (cardDate[0].value.length === 2 && cardDate[0].value <= 12 && cardDate[1].value === '') {
    cardDate[1].focus();
    hideError(2, cardDate[1])
  }

  if (cardDate[0].value.length === 1) {
    cardDateDesign[0].innerHTML = '0' + cardDate[0].value
  } else if (cardDate[0].value !== '') {
    cardDateDesign[0].innerHTML = cardDate[0].value
  } else {
    cardDateDesign[0].innerHTML = '00'
  }

});

cardDate[1].addEventListener('input', function () {
  // Remove non-numeric characters and 'e' or 'E' from the input value
  this.value = this.value.replace(/[eE]/g, '');
  if (cardDate[1].value.length > 1) {
    cardDate[1].value = cardDate[1].value.slice(0, 2);
  }

  switch (cardDate[1].value) {
    case '':
      if (cardDate[0].value === '') {
        hideError(2, [cardDate[0], cardDate[1]])
      } else {
        hideError(2, cardDate[1], true)
      }
      break;

    default:
      if (cardDate[0].value > 12) {
        showError(2, "Not valied", cardDate[0])
      } else if (cardDate[1].value <= 99 && cardDate[0].value <= 12) {
        hideError(2, [cardDate[0], cardDate[1]])
      } else if (cardDate[1].value <= 99) {
        hideError(2, cardDate[1], true)
      }
  }

  if (cardDate[1].value.length === 2 && cardDate[1].value <= 99 && cardDate[0].value === '') {
    cardDate[0].focus();
    hideError(2, cardDate[0])
  }
  if (cardDate[1].value.length === 1) {
    cardDateDesign[1].innerHTML = '0' + cardDate[1].value
  } else if (cardDate[1].value !== '') {
    cardDateDesign[1].innerHTML = cardDate[1].value
  } else {
    cardDateDesign[1].innerHTML = '00'
  }

});

cardDate[0].addEventListener('blur', () => {

  // Delay is for getting isFocused() result in time 
  setTimeout(() => {
    switch (cardDate[0].value) {
      case '':
        if (cardDate[1].value === '' && isFocused(cardDate[1]) === false) {
          showError(2, "Can't be blank", [cardDate[0], cardDate[1]])

        } else if (isFocused(cardDate[1]) === false) {
          showError(2, "Can't be blank", cardDate[0])

        } else {
          hideError(2, [cardDate[0], cardDate[1]])
        }
        break;

      default:
        if (cardDate[0].value > 12 && cardDate[1].value === '' && isFocused(cardDate[1]) === false) {
          showError(2, "Not valied", [cardDate[0], cardDate[1]])
        } else if (cardDate[0].value > 12) {
          showError(2, "Not valied", cardDate[0])
        } else if (cardDate[1].value === '' && isFocused(cardDate[1]) === false) {
          showError(2, "Can't be blank", cardDate[1])
        } else {
          hideError(2, cardDate[0], true)
        }
    }
  }, 50)

})

cardDate[1].addEventListener('blur', () => {

  //  Delay is for getting isFocused() result in time 
  setTimeout(() => {
    switch (cardDate[1].value) {
      case '':
        if (cardDate[0].value === '' && isFocused(cardDate[0]) === false) {
          showError(2, "Can't be blank", [cardDate[0], cardDate[1]])

        } else if (cardDate[0].value > 12 && isFocused(cardDate[0]) === false) {
          showError(2, "Not valied", [cardDate[0], cardDate[1]])

        } else if (isFocused(cardDate[0]) === false) {
          showError(2, "Can't be blank", cardDate[1])

        } else {
          hideError(2, [cardDate[0], cardDate[1]])

        }
        break;

      default:
        if (cardDate[0].value === '' && isFocused(cardDate[0]) === false) {
          showError(2, "Can't be blank", cardDate[0])
        }
    }
  }, 50)

})

cardCVC.addEventListener('input', function () {

  // Remove non-numeric characters and 'e' or 'E' from the input value
  this.value = this.value.replace(/[eE]/g, '');
  if (cardCVC.value.length > 1) {
    cardCVC.value = cardCVC.value.slice(0, 3);
  }

  if (cardCVC.value.length === 3) {
    hasError = false
  } else {
    hasError = true
  }

  if (cardCVC.value.length += 1) {
    hideError(3, cardCVC)
  }

  if (cardCVC.value !== '') {
    cardCVCDesign.innerHTML = cardCVC.value
  } else {
    cardCVCDesign.innerHTML = '000'
  }

})

cardCVC.addEventListener('blur', () => {
  switch (cardCVC.value) {
    case '':
      showError(3, "Can't be blank", cardCVC)
      break;
    default:
      if (cardCVC.value.length < 3) {
        showError(3, "Not valied", cardCVC)
      } else {
        hideError(3, cardCVC)
      }
  }

})
//The button is activated when inputs are filled
document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll('input');

  for (const i of inputs) {
    i.addEventListener("input", checkSubmit);
  }

  confirmButton.disabled = true;

  function checkSubmit() {

    let isValid = true;
    for (const i of inputs) {
      isValid = isValid && !!i.value;
    }
    for (const i of [...error]) {
      isValid = isValid && !i.innerText
    }
    isValid = isValid && !hasError
    confirmButton.disabled = !isValid;

  }

});

confirmButton.addEventListener('click', () => {
  setTimeout(() => {
    formSide.style.opacity = '0';
    setTimeout(() => {
      formSide.style.alignItems = 'center'
      formSide.innerHTML = `
      <div class="thanks-container">
        <img class="icon-complete" src="images/icon-complete.svg" alt="">
        <h2 class="title-complete">Thank you!</h2>
        <p class="paragraph-complete">We've added your card details</p>
         <button class="btn">Continue</button>
      </div>`;
      formSide.style.opacity = '1';
    }, 400);
  }, 50);

})

