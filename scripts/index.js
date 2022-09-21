
let formElement = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__input_el_name");
let jobInput = document.querySelector(".popup__input_el_job");
let closeButton = document.querySelector(".popup__close-button");
let profileEditButton = document.querySelector(".profile__edit-button");
let bodyElement = document.querySelector(".body");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

// let likeIcons = document.querySelectorAll(".elements__list-button");
// likeIcons.forEach(likeIcon => likeIcon.addEventListener('click', () => likeIcon.classList.toggle('elements__list-button_active')));

closeButton.addEventListener('click',  popupToggle);
profileEditButton.addEventListener('click',  popupToggle);
formElement.addEventListener('submit', formSubmitHandler); 

function popupToggle() {
    formElement.classList.toggle('popup_opened');
    checkPopupState();
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;  
    profileSubtitle.textContent =  jobInput.value;
    popupToggle();
}

function checkPopupState() {
    if (formElement.classList.contains('popup_opened')) {
        popupShow();
    } else {
        popupClose();
    }
}

function popupShow() {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
        bodyElement.style.overflow = 'hidden';
}

function popupClose() {
    bodyElement.style.overflow = 'visible';
}


