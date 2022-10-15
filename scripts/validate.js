
const showInputError = (inputElement, errorMessage, formElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
    const saveButton = formElement.querySelector(".popup__save-button")
    saveButton.disabled = true;
};

const hideInputError = (inputElement, formElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
    validateSaveButton(formElement)
};

const checkInputValidity = (inputElement, formElement) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, formElement);
    } else {
        hideInputError(inputElement, formElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    validateSaveButton(formElement)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, formElement);
        });
    });
};

const validateSaveButton = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        const saveButton = formElement.querySelector(".popup__save-button")
        if (inputElement.value === '') {
            saveButton.disabled = true;
            return
        } else {
            saveButton.disabled = false;
        }
    });
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation()