const requestButton = document.querySelector("#request-button");

const overlay = document.querySelector(".overlay");
const modalWrapper = document.querySelector(".modal-wrapper");

// Элементы всплывающего окна
const popupWindow = document.querySelector(".popup--main");

const popupForm = popupWindow.querySelector("#popup__form");
const popupNameInput = popupWindow.querySelector("#your-name");
const popupPhoneInput = popupWindow.querySelector("#your-phone");
const popupMessageInput = popupWindow.querySelector("#your-message");
const popupCloseButton = popupWindow.querySelector(".popup__close");
const popupErrorNameMessage = popupWindow.querySelector(".popup__error-message--name");
const popupErrorPhoneMessage = popupWindow.querySelector(".popup__error-message--phone");


// Элементы формы в подвале
const footerForm = document.querySelector(".feedback__form");
const footerFormNameInput = footerForm.querySelector("#name");
const footerFormPhoneInput = footerForm.querySelector("#phone");
const footerFormErrorNameMessage = footerForm.querySelector(".feedback__error-message--name");
const footerFormErrorPhoneMessage = footerForm.querySelector(".feedback__error-message--phone");

const ESC_KEYCODE = 27;

const navCoverButton = document.querySelector(".navigation__button");
const navBlock = document.querySelector(".navigation");

const contactsCoverButton = document.querySelector(".contacts__button");
const contactsBlock = document.querySelector(".contacts");

const width = window.innerWidth || document.documentElement.clientWidth ||
  document.body.clientWidth;

const promoButton = document.querySelector(".promo__button");


const scrollLink = document.querySelector(".promo__link");
const advantagesBlock = document.querySelector(".advantages__list");


// Обработчик скролла до нужного элемента
function handleButtonClick(element) {
  element.scrollIntoView({block: "center", behavior: "smooth"});
}

// Навешивание обработчиков события (клик + скролл)
promoButton.addEventListener('click', function (e) {
  e.preventDefault();
  handleButtonClick(footerForm)
});

scrollLink.addEventListener('click', function (e) {
  e.preventDefault();
  handleButtonClick(advantagesBlock)
});

// Функция, переключающая видимость блоков и стили кнопки

function toggleMenu(elem, btn) {
  elem.classList.toggle('menu-closed');
  elem.classList.toggle('menu-opened');
  btn.classList.toggle('button--closed');
}

// Блок, отвечающий за видимость меню в футере
if (width < 768) {
  navBlock.addEventListener("click", function () {
    toggleMenu(navBlock, navCoverButton);
    toggleMenu(contactsBlock, contactsCoverButton);
  });
  navBlock.classList.add("menu-closed");
  navCoverButton.classList.add("button--closed");
}

if (width < 768) {
  contactsBlock.addEventListener("click", function () {
    toggleMenu(contactsBlock, contactsCoverButton);
    toggleMenu(navBlock, navCoverButton);
  });
  contactsBlock.classList.add("menu-opened");
}

// Открытие всплывающего окна и навешивание обработчиков события для его закрытия
function openPopup() {
  if (modalWrapper) {
    modalWrapper.classList.remove("modal-wrapper--closed");
    document.body.style.overflow = 'hidden';
  }
  if (overlay) {
    overlay.classList.remove("overlay--closed");

    overlay.addEventListener("click", overlayClickHandler);
  }
  if (popupNameInput) {
    popupNameInput.focus()
  }
  document.addEventListener("keydown", popupEscPressHandler);
}

// Закрытие всплывающего окна и удаление обработчиков события для его закрытия

function closePopup() {
  modalWrapper.classList.add("modal-wrapper--closed");
  overlay.classList.add("overlay--closed");
  overlay.removeEventListener("click", overlayClickHandler);
  document.removeEventListener("keydown", popupEscPressHandler);
  document.body.style.overflow = 'visible';
}

// Навешивание обработчиков события для вызова всплывающего окна и его закрытия
if (requestButton) {
  requestButton.addEventListener("click", openPopup);
}

if (popupCloseButton) {
  popupCloseButton.addEventListener("click", closePopup);
}

//Функции закрытия всплывающего окна по нажатию ESC или клика вне окна

function popupEscPressHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function overlayClickHandler() {
  closePopup();
}


//Создание маски для input

const maskOptions = {
  mask: '+{7}(000)000-00-00'
};
const popupMask = IMask(popupPhoneInput, maskOptions);
const footerMask = IMask(footerFormPhoneInput, maskOptions);


// Создание окна результата загрузки формы
function createResultPopup(result) {
  let fragment = document.createDocumentFragment();
  let resultTemplate = document.querySelector('#' + result)
    .content
    .querySelector('.popup--' + result);
  let resultItem = resultTemplate.cloneNode(true);
  fragment.appendChild(resultItem);

  modalWrapper.parentNode.insertBefore(fragment, modalWrapper);
  document.body.style.overflow = 'hidden';
}

// Успех загрузки
function sendFormSuccessHandler() {
  createResultPopup('success');

  const successWindow = document.querySelector('.popup--success');
  const successButton = successWindow.querySelector('.popup__button--success');

  function closeSuccessWindow() {
    successWindow.remove();
    document.body.style.overflow = 'visible';
  }

  document.addEventListener('click', closeSuccessWindow);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessWindow();
    }
  });
  successButton.addEventListener('click', closeSuccessWindow);
}

// Ошибка загрузки
function sendFormErrorHandler() {
  createResultPopup('error');

  const errorWindow = document.querySelector('.popup--error');
  const errorButton = errorWindow.querySelector('.popup__button--error');

  function closeErrorWindow() {
    errorWindow.remove();
    document.body.style.overflow = 'visible';
  }

  document.addEventListener('click', closeErrorWindow);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorWindow();
    }
  });
  errorButton.addEventListener('click', closeErrorWindow);
}

// Отправка данных на сервер

function postData(data) {
  fetch('https://echo.htmlacademy.ru', {
    method: 'POST',
    body: data
  }).then(
    function (response) {
      if (response.status === 200) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    }
  ).then(function () {
    closePopup();
    sendFormSuccessHandler();
  }).catch(function () {
    closePopup();
    sendFormErrorHandler();
  });
}

// Правила валидации

const nameInputRules = {
  length: [
    10,
    'Длина имени должна быть не более 10 символов!'
  ],
  pattern: [
    /^[a-zа-яё]+$/i,
    'Имя должно состоять только из букв!'
  ]
};

const phoneInputRules = {
  length: [
    16,
    'Номер телефона должен быть 16-значным!'
  ],
  pattern: [
    /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
    'Номер телефона должен состоять только из цифр!'
  ]
};


function CustomValidation() {
}

CustomValidation.prototype = {
  nameInvalidities: [],
  phoneInvalidities: [],

  // Валидация поля Имя

  checkNameValidity: function (input) {
    let result = true;
    let inputFieldValues = input.value.trim().split(/\s+/);
    if (!(inputFieldValues[0] === '')) {
      if (input.value.length > nameInputRules.length[0]) {
        this.addInvalidity(this.nameInvalidities, nameInputRules.length[1]);
        result = false
      }

      for (let i = 0; i < inputFieldValues.length; i++) {
        if (!inputFieldValues[i].match(nameInputRules.pattern[0])) {
          this.addInvalidity(this.nameInvalidities, nameInputRules.pattern[1]);
          result = false
        }
      }
    }
    return result;
  },

  // Валидация поля Телефон

  checkPhoneValidity: function (input) {
    let result = true;
    let inputFieldValues = input.value;
    if (!(inputFieldValues[0] === '')) {
      if (inputFieldValues.length !== phoneInputRules.length[0]) {
        this.addInvalidity(this.phoneInvalidities, phoneInputRules.length[1]);
        result = false
      }


      if (!inputFieldValues.match(phoneInputRules.pattern[0])) {
        this.addInvalidity(this.phoneInvalidities, phoneInputRules.pattern[1]);
        result = false
      }
    }
    return result;
  },

  // Добавление сообщения об ошибке в массив ошибок
  addInvalidity: function (array, message) {
    array.push(message);
  },

  getInvaliditiesForHTML: function (array) {
    return array.join('<br>');
  }
};

// Обработчик ввода в поля input на всплывающем окне

function validationInputHandler(evt, element, classN) {
  if (!(evt.target.value === '')) {
    evt.target.setCustomValidity('');
    let errorMessage = element.querySelector(classN);
    if (errorMessage) {
      errorMessage.innerHTML = '';
    }
  }
}

// Обработчик отправки формы

function sendData(evt, form, name, phone, nameMessage, phoneMessage) {
  let sendingData = new FormData(form);
  let inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
  CustomValidation.prototype.nameInvalidities = [];
  CustomValidation.prototype.phoneInvalidities = [];
  let nameIsIncorrect = !inputCustomValidation.checkNameValidity(name);
  let phoneIsIncorrect = !inputCustomValidation.checkPhoneValidity(phone);
  if (nameIsIncorrect) {
    nameMessage.innerHTML = inputCustomValidation.getInvaliditiesForHTML(CustomValidation.prototype.nameInvalidities);
    name.style.borderColor = 'red';
    evt.preventDefault();
  }
  if (phoneIsIncorrect) {
    phoneMessage.innerHTML = inputCustomValidation.getInvaliditiesForHTML(CustomValidation.prototype.phoneInvalidities);
    phone.classList.add('input-error');
    phone.style.borderColor = 'red';
    evt.preventDefault();
  }
  if (!nameIsIncorrect && !phoneIsIncorrect) {
    evt.preventDefault();
    postData(sendingData);
  }
}

//    ОБРАБОТКА ФОРМЫ В ПОДВАЛЕ

// Навешивание обработчиков ввода в поля input в форме в подвале

footerFormNameInput.addEventListener('input', function (evt) {
  validationInputHandler(evt, footerForm, ".feedback__error-message--name");
  footerFormNameInput.style.borderColor = 'transparent';
  CustomValidation.prototype.nameInvalidities = [];
});
footerFormPhoneInput.addEventListener('input', function (evt) {
  validationInputHandler(evt, footerForm, ".feedback__error-message--phone");
  footerFormPhoneInput.style.borderColor = 'transparent';
  CustomValidation.prototype.phoneInvalidities = [];
});

// Обработка отправки формы в подвале

footerForm.addEventListener('submit', function (evt) {
  sendData(evt, footerForm, footerFormNameInput, footerFormPhoneInput, footerFormErrorNameMessage, footerFormErrorPhoneMessage);
});


//    ОБРАБОТКА ФОРМЫ ВСПЛЫВАЮЩЕГО ОКНА

//Сохранение значений полей input в localStorage

if (popupNameInput) {
  popupNameInput.value = localStorage.getItem('name');
  popupNameInput.oninput = () => {
    localStorage.setItem('name', popupNameInput.value);
  };
}

if (popupPhoneInput) {
  popupPhoneInput.value = localStorage.getItem('phone');
  popupPhoneInput.oninput = () => {
    localStorage.setItem('phone', popupPhoneInput.value)
  };
}

if (popupMessageInput) {
  popupMessageInput.value = localStorage.getItem('message');
  popupMessageInput.oninput = () => {
    localStorage.setItem('message', popupMessageInput.value)
  };
}


// Навешивание обработчиков ввода в поля input на всплывающем окне

popupNameInput.addEventListener('input', function (evt) {
  validationInputHandler(evt, popupWindow, ".popup__error-message--name");
  popupNameInput.style.borderColor = 'transparent';
  CustomValidation.prototype.nameInvalidities = [];
});
popupPhoneInput.addEventListener('input', function (evt) {
  validationInputHandler(evt, popupWindow, ".popup__error-message--phone");
  popupPhoneInput.style.borderColor = 'transparent';
  CustomValidation.prototype.phoneInvalidities = [];
});

// Обработка отправки формы всплывающего окна

popupForm.addEventListener('submit', function (evt) {
  sendData(evt, popupForm, popupNameInput, popupPhoneInput, popupErrorNameMessage, popupErrorPhoneMessage);
});
