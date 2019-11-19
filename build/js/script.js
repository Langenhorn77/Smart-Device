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


function toggleMenu(elem, btn) {
  elem.classList.toggle('menu-closed');
  btn.classList.toggle('button--closed');
}

if (navCoverButton) {
  navCoverButton.addEventListener("click", function () {
    toggleMenu(navBlock, navCoverButton);
  });
}

if (contactsCoverButton) {
  contactsCoverButton.addEventListener("click", function () {
    toggleMenu(contactsBlock, contactsCoverButton);
  });
}

if (requestButton) {
  requestButton.addEventListener("click", openPopup);
}

if (closeButton) {
  closeButton.addEventListener("click", closePopup);
}

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


function popupEscPressHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function overlayClickHandler() {
  closePopup();
}


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

function closePopup() {
  popupWindow.classList.add("popup--closed");
  overlay.classList.add("overlay--closed");
  overlay.removeEventListener("click", overlayClickHandler);
  document.removeEventListener("keydown", popupEscPressHandler);
}





