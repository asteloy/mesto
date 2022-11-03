import { Card } from './Card.js'
import { initialCards } from './initialCards.js'
import { FormValidator } from './FormValidator.js'

const cardsContainer = document.querySelector(".elements__list");
const cardPopup = document.querySelector("#popup_card");
const profilePopup = document.querySelector("#popup_profile");
const imagePopup = document.querySelector("#popup_image");
const nameInput = document.querySelector(".popup__input_el_name");
const jobInput = document.querySelector(".popup__input_el_job");
const titleInput = document.querySelector(".popup__input_el_title");
const urlInput = document.querySelector(".popup__input_el_url");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const bodyElement = document.querySelector(".body");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popups = document.querySelectorAll('.popup');
const elementTemplate = document.querySelector('#element-template').content;

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const formValidProfile = new FormValidator(validationConfig, profilePopup.querySelector(".popup__container"))
const formValidCard = new FormValidator(validationConfig, cardPopup.querySelector(".popup__container"))

formValidProfile.enableValidation()
formValidCard.enableValidation()

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
});

profileEditButton.addEventListener('click', handleOpenProfilePopup);
cardAddButton.addEventListener('click', handleOpenCardPopup);
profilePopup.addEventListener('submit', handleProfileFormSubmit);
cardPopup.addEventListener('submit', handleCardSubmit);

initialCards.forEach(card => cardsContainer.prepend(addCard(card.name, card.link)))

function addCard(cardName, cardImage) {
    const cardItem = new Card(
        cardName,
        cardImage,
        elementTemplate,
        imagePopup,
        openPopup
    )
    const cardElenent = cardItem.createCard()
    return cardElenent
}

function handleOpenProfilePopup() {
    openPopup(profilePopup)
    addInputsValue();
    formValidProfile.resetValidation()
}

function handleOpenCardPopup() {
    openPopup(cardPopup)
    formValidCard.resetValidation()
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(evt.target.closest('.popup'));
}

function handleCardSubmit(evt) {
    evt.preventDefault();
    const cardName = titleInput.value;
    const cardImage = urlInput.value;
    evt.target.closest('form').reset();
    evt.submitter.disabled = true;
    cardsContainer.prepend(addCard(cardName, cardImage))
    closePopup(evt.target.closest('.popup'));
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    bodyElement.classList.add('body__style_overflow_hidden');
    document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup)
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    bodyElement.classList.remove('body__style_overflow_hidden');
    document.removeEventListener('keydown', closeByEscape);
}

function addInputsValue() {
    if (profilePopup.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
    }
}


