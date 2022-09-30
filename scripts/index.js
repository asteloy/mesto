const cards = document.querySelector(".elements__list");
const formElementCard = document.querySelector("#popup_card");
const formElementProfile = document.querySelector("#popup_profile");
const formElementImg = document.querySelector("#popup_image");
const formElementImgContainer = document.querySelector("#popup__container-image");
const nameInput = document.querySelector(".popup__input_el_name");
const jobInput = document.querySelector(".popup__input_el_job");
const titleInput = document.querySelector(".popup__input_el_title");
const urlInput = document.querySelector(".popup__input_el_url");
const buttonsClose = document.querySelectorAll(".popup__close-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const bodyElement = document.querySelector(".body");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

buttonsClose.forEach(button => button.addEventListener('click', handleClosePopup));
profileEditButton.addEventListener('click', handleOpenPopup);
cardAddButton.addEventListener('click', handleOpenPopup);
formElementProfile.addEventListener('submit', handleFormSubmit);
formElementCard.addEventListener('submit', handleCardSubmit);

initialCards.forEach(card => cards.prepend(addCard(card.name, card.link)))

function addCard(cardName, cardImage) {

    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.elements__list-item').cloneNode(true);
    const image = element.querySelector('.elements__list-img');
    image.src = cardImage;
    image.alt = cardName;
    image.addEventListener('click', handleOpenPopup);

    const title = element.querySelector('.elements__list-title');
    title.textContent = cardName;

    const deleteButtonElement = element.querySelector('.elements__list-delete-button');
    deleteButtonElement.addEventListener('click', () => deleteButtonElement.closest(".elements__list-item").remove());

    const likeButtonElement = element.querySelector('.elements__list-button');
    likeButtonElement.addEventListener('click', () => likeButtonElement.classList.toggle('elements__list-button_active'))

    return element

}

function handleClosePopup() {
    if (formElementImg.classList.contains('popup_opened')) {
        formElementImgContainer.querySelector(".popup__img-title").remove();
        formElementImgContainer.querySelector(".elements__list-img_state_extended").remove();
    }
    const popupElem = this.closest(".popup");
    popupElem.classList.remove('popup_opened');
    bodyElement.classList.remove('body__style_overflow_hidden');
}

function handleOpenPopup() {

    if (this.classList.contains('profile__edit-button')) {
        openPopup(formElementProfile)
        addInputsValue();
    } else if (this.classList.contains('profile__add-button')) {
        openPopup(formElementCard)
    } else if (this.classList.contains('elements__list-img')) {
        openPopup(formElementImg)
        formElementImgContainer.append(createImagePopup(this));
    }

}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(this);
}

function handleCardSubmit(evt) {
    evt.preventDefault();
    const cardName = titleInput.value;
    const cardImage = urlInput.value;
    cards.prepend(addCard(cardName, cardImage))
    closePopup(this);
}


function openPopup(elem) {
    elem.classList.add('popup_opened');
    bodyElement.classList.add('body__style_overflow_hidden');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    bodyElement.classList.remove('body__style_overflow_hidden');
}

function addInputsValue() {
    if (formElementProfile.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
    }
}

function createImagePopup(elem) {

    const elementTemplate = document.querySelector('#img-popup-template').content;
    const element = elementTemplate.querySelector('#popup__wrapper').cloneNode(true);

    const image = element.querySelector('.elements__list-img_state_extended');
    image.src = elem.src;
    image.alt = elem.alt;

    const title = element.querySelector('.popup__img-title');
    title.textContent = elem.alt;

    return element
}




