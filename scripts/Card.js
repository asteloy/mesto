export class Card {
    constructor(cardName, cardImage, elementTemplate, imagePopup, openPopup) {

        this._elementCardName = cardName
        this._elementCardLink = cardImage
        this._elementTemplateCard = elementTemplate.querySelector('.elements__list-item')
        this._imagePopup = imagePopup
        this._openPopup = openPopup
    }

    _handleCardClick() {
        this._imagePopupImage = this._imagePopup.querySelector('.popup__image');
        this._imagePopupImage.src = this._elementCardLink;
        this._imagePopupImage.alt = this._elementCardName;
        this._imagePopupTitle = this._imagePopup.querySelector('.popup__img-title');
        this._imagePopupTitle.textContent = this._elementCardName;
        this._openPopup(this._imagePopup)
    }

    _addEventListeners() {
        this._likeButtonElement.addEventListener('click', () => this._likeButtonElement.classList.toggle('elements__list-button_active'))
        this._deleteButtonElement.addEventListener('click', () => this._deleteButtonElement.closest(".elements__list-item").remove())
        this._cardImage.addEventListener('click', () => this._handleCardClick())
    }

    createCard() {

        this._elementCard = this._elementTemplateCard.cloneNode(true)

        this._cardRemove = this._elementCard.querySelector('.element__delete')
        this._cardTitle = this._elementCard.querySelector('.elements__list-title')
        this._cardImage = this._elementCard.querySelector('.elements__list-img')
        this._likeButtonElement = this._elementCard.querySelector('.elements__list-button');
        this._deleteButtonElement = this._elementCard.querySelector('.elements__list-delete-button');

        this._cardTitle.textContent = this._elementCardName
        this._cardImage.src = this._elementCardLink
        this._cardImage.alt = this._elementCardName

        this._addEventListeners()

        return this._elementCard

    }
}