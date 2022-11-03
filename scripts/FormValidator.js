export class FormValidator {
    constructor(props, form) {
        this._props = props
        this._form = form
        this._buttonElement = this._form.querySelector(this._props.submitButtonSelector)
    }

    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._props.inputErrorClass)
        errorElement.classList.remove(this._props.errorClass)
        errorElement.textContent = ''
    }

    _showInputError(inputElement, errorElement) {
        inputElement.classList.add(this._props.inputErrorClass)
        errorElement.classList.add(this._props.errorClass)
        errorElement.textContent = inputElement.validationMessage
    }

    _toggleButtonState() {
        const isFormValid = this._form.checkValidity()
        this._buttonElement.classList.toggle(this._props.inactiveButtonClass, !isFormValid)
        this._buttonElement.disabled = !isFormValid
    }

    _checkInputValidity(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, errorElement)
        } else {
            this._showInputError(inputElement, errorElement)
        }
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault()
        })
        this._inputList = this._form.querySelectorAll(this._props.inputSelector)

        this._toggleButtonState()
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState()
            })
        })
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            const errorElement = inputElement.nextElementSibling;
            this._hideInputError(inputElement, errorElement)
        })
        this._toggleButtonState()
    }

    enableValidation() {
        this._setEventListeners()
    }
}