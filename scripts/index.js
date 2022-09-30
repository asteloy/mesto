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

initialCards.forEach(card => addCard(card.name, card.link))

function addCard(cardName, cardImage) {
    const deleteButtonElement = createDeleteButton();
    const imageElement = createImageElement(cardName, cardImage);
    const titleElement = createTitleElement(cardName);
    const likeButtonElement = createLikeButtonElement();
    const descriptionElement = createDescriptionElement(titleElement, likeButtonElement);
    const cardContainer = createCardContainerElement(imageElement, descriptionElement, deleteButtonElement);
    cards.prepend(cardContainer);
}

function createCardContainerElement(imageElement, descriptionElement, deleteButtonElement) {
    const cardContainer = document.createElement('li');
    cardContainer.classList.add('elements__list-item');
    cardContainer.append(imageElement, descriptionElement, deleteButtonElement);
    return cardContainer;
}

function createImageElement(cardName, cardImage) {
    const imageElement = document.createElement('img');
    imageElement.classList.add('elements__list-img');
    imageElement.src = cardImage;
    imageElement.addEventListener('click', handleOpenPopup)
    imageElement.alt = cardName;
    return imageElement;
}

function createTitleElement(cardName) {
    const titleElement = document.createElement('h3');
    titleElement.classList.add('elements__list-title');
    titleElement.textContent = cardName;
    return titleElement;
}

function createLikeButtonElement() {
    const likeButtonElement = document.createElement('button');
    likeButtonElement.classList.add('elements__list-button');
    likeButtonElement.addEventListener('click', () => likeButtonElement.classList.toggle('elements__list-button_active'))
    return likeButtonElement;
}

function createDescriptionElement(titleElement, likeButtonElement) {
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('elements__list-description');
    descriptionElement.append(titleElement, likeButtonElement);
    return descriptionElement;
}

function createDeleteButton() {
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('elements__list-delete-button');
    deleteButtonElement.addEventListener('click', () => deleteButtonElement.closest(".elements__list-item").remove());
    return deleteButtonElement;
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
        createImagePopup(this);
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
    addCard(cardName, cardImage)
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
    const imageElement = createImageElement(elem.alt, elem.src);
    imageElement.classList.add('elements__list-img_state_extended');
    imageElement.classList.remove('elements__list-img');

    const titleElement = createTitleElement(elem.alt);
    titleElement.classList.add('popup__img-title');

    formElementImgContainer.append(imageElement, titleElement);
}




