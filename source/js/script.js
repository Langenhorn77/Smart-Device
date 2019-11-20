const requestButton = document.querySelector("#request-button");
const popupWindow = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");

const nameInput = popupWindow.querySelector("#your-name");
const phoneInput = popupWindow.querySelector("#your-phone");
const messageInput = popupWindow.querySelector("#your-message");
const closeButton = popupWindow.querySelector(".popup__close");
const ESC_KEYCODE = 27;

const navCoverButton = document.querySelector(".navigation__button");
const navBlock = document.querySelector(".navigation");

const contactsCoverButton = document.querySelector(".contacts__button");
const contactsBlock = document.querySelector(".contacts");

const width = window.innerWidth || document.documentElement.clientWidth ||
  document.body.clientWidth;

const promoButton = document.querySelector(".promo__button");
const formBlock = document.querySelector(".feedback__form");

const scrollLink = document.querySelector(".promo__link");
const advantagesBlock = document.querySelector(".advantages__list");


// Обработчик скролла до нужного элемента
function handleButtonClick(element) {
  element.scrollIntoView({block: "center", behavior: "smooth"});
}

// Навешивание обработчиков события (клик + скролл)
promoButton.addEventListener('click', function (e) {
  e.preventDefault();
  handleButtonClick(formBlock)
});

scrollLink.addEventListener('click', function (e) {
  e.preventDefault();
  handleButtonClick(advantagesBlock)
});

// Функция, переключающая видимость блоков и стили кнопки

function toggleMenu(elem, btn) {
  elem.classList.toggle('menu-closed');
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
}

// Открытие всплывающего окна и навешивание обработчиков события для его закрытия
function openPopup() {
  if (popupWindow) {
    popupWindow.classList.remove("popup--closed");
  }
  if (overlay) {
    overlay.classList.remove("overlay--closed");
    overlay.addEventListener("click", overlayClickHandler);
  }
  if (nameInput) {
    nameInput.focus()
  }
  document.addEventListener("keydown", popupEscPressHandler);
}

// Закрытие всплывающего окна и удаление обработчиков события для его закрытия

function closePopup() {
  popupWindow.classList.add("popup--closed");
  overlay.classList.add("overlay--closed");
  overlay.removeEventListener("click", overlayClickHandler);
  document.removeEventListener("keydown", popupEscPressHandler);
}

// Навешивание обработчиков события для вызова всплывающего окна и его закрытия
if (requestButton) {
  requestButton.addEventListener("click", openPopup);
}

if (closeButton) {
  closeButton.addEventListener("click", closePopup);
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

//Сохранение значений полей input в localStorage

if (nameInput) {
  nameInput.value = localStorage.getItem('name');
  nameInput.oninput = () => {
    localStorage.setItem('name', nameInput.value)
  };
}

if (phoneInput) {
  phoneInput.value = localStorage.getItem('phone');
  phoneInput.oninput = () => {
    localStorage.setItem('phone', phoneInput.value)
  };
}

if (messageInput) {
  messageInput.value = localStorage.getItem('message');
  messageInput.oninput = () => {
    localStorage.setItem('message', messageInput.value)
  };
}

//Создание маски для input

const maskOptions = {
  mask: '+{7}(000)000-00-00'
};
const mask = IMask(phoneInput, maskOptions);
