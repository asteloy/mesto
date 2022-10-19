
const cardsContainer = document.querySelector(".elements__list");
const cardPopup = document.querySelector("#popup_card");
const profilePopup = document.querySelector("#popup_profile");
const imagePopup = document.querySelector("#popup_image");
const formElementImgContainer = document.querySelector("#popup__container-image");
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
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.elements__list-item').cloneNode(true);
    const image = element.querySelector('.elements__list-img');
    image.src = cardImage;
    image.alt = cardName;
    image.addEventListener('click', () => handleCardClick(cardName, cardImage));

    const title = element.querySelector('.elements__list-title');
    title.textContent = cardName;

    const deleteButtonElement = element.querySelector('.elements__list-delete-button');
    deleteButtonElement.addEventListener('click', () => deleteButtonElement.closest(".elements__list-item").remove());

    const likeButtonElement = element.querySelector('.elements__list-button');
    likeButtonElement.addEventListener('click', () => likeButtonElement.classList.toggle('elements__list-button_active'))

    return element
}

function handleOpenProfilePopup() {
    openPopup(profilePopup)
    addInputsValue();
}

function handleOpenCardPopup() {
    openPopup(cardPopup)
}

function handleCardClick(cardName, cardImage) {
    const image = imagePopup.querySelector('.popup__image');
    image.src = cardImage;
    image.alt = cardName;
    const title = imagePopup.querySelector('.popup__img-title');
    title.textContent = cardName;
    openPopup(imagePopup)
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


