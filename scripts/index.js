const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const cards = document.querySelector(".elements__list");

  initialCards.forEach(card => addCard(card.name, card.link))

  function addCard(cardName, cardImage) {
  
    const cardContainer = document.createElement('li');
    cardContainer.classList.add('elements__list-item');
    
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('elements__list-delete-button');
    deleteButtonElement.addEventListener('click', () => deleteButtonElement.parentElement.remove());

    const imageElement = document.createElement('img');
    imageElement.classList.add('elements__list-img');
    imageElement.src = cardImage;
    imageElement.addEventListener('click', popupToggle)
    imageElement.alt = "Красивая картинка";
  
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('elements__list-description');
  
    const titleElement = document.createElement('h3');
    titleElement.classList.add('elements__list-title');
    titleElement.textContent = cardName;

    const likeButtonElement = document.createElement('button');
    likeButtonElement.classList.add('elements__list-button');
    likeButtonElement.addEventListener('click', () => likeButtonElement.classList.toggle('elements__list-button_active'))
    
    cards.prepend(cardContainer); 
    cardContainer.append(imageElement, descriptionElement, deleteButtonElement); 
    descriptionElement.append(titleElement,likeButtonElement);   
  }

const formElementCard = document.querySelector("#popup_card");
const formElementProfile = document.querySelector("#popup_profile");
const formElementImg = document.querySelector("#popup_image");
const formElementImgContainer = document.querySelector("#popup__container-image");
const nameInput = document.querySelector(".popup__input_el_name");
const jobInput = document.querySelector(".popup__input_el_job");
const titleInput = document.querySelector(".popup__input_el_title");
const urlInput = document.querySelector(".popup__input_el_url");
const closeButtons = document.querySelectorAll(".popup__close-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const bodyElement = document.querySelector(".body");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

closeButtons.forEach(closeButton => closeButton.addEventListener('click',  popupClose));
profileEditButton.addEventListener('click',  popupToggle);
cardAddButton.addEventListener('click',  popupToggle);
formElementProfile.addEventListener('submit', formSubmitHandler); 
formElementCard.addEventListener('submit', cardSubmitHandler); 

function popupClose() {
    if (formElementImg.classList.contains('popup_opened')) {
        formElementImgContainer.querySelector(".popup__img-title").remove();
        formElementImgContainer.querySelector(".elements__list-img_state_extended").remove();
    }
    const popupElem = this.parentElement.parentElement.parentElement;
    popupElem.classList.toggle('popup_opened');
    bodyElement.classList.toggle('body__style_overflow_hidden');
}

function popupToggle() {

    if (this.classList.contains('profile__edit-button')) {
        formElementProfile.classList.toggle('popup_opened');
        checkPopupState();
    } else if (this.classList.contains('profile__add-button')) {
        formElementCard.classList.toggle('popup_opened');
    } else if (this.classList.contains('elements__list-img')) {
        formElementImg.classList.toggle('popup_opened');
        toggleImageState(this);
    }
    bodyElement.classList.toggle('body__style_overflow_hidden');
}

function popupToggleHandler(popup) {
    popup.classList.toggle('popup_opened');
    bodyElement.classList.toggle('body__style_overflow_hidden');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;  
    profileSubtitle.textContent =  jobInput.value;
    popupToggleHandler(this);
    bodyElement.classList.toggle('body__style_overflow_hidden');
}

function cardSubmitHandler (evt) {
    evt.preventDefault(); 
    const cardName = titleInput.value;  
    const cardImage =  urlInput.value;
    addCard(cardName, cardImage)
    popupToggleHandler(this);
}

function checkPopupState() {
    if (formElementProfile.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
    } 
}

function toggleImageState(elem) {

    const imageElement = document.createElement('img');
    imageElement.classList.add('elements__list-img_state_extended');
    imageElement.src = elem.src;
    imageElement.alt = "Красивая картинка";
    
    const titleElement = document.createElement('h3');
    titleElement.classList.add('popup__img-title');
    titleElement.textContent = elem.nextSibling.firstChild.textContent;
    
    formElementImgContainer.append(imageElement, titleElement); 

}




