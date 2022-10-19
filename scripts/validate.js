
const showInputError = (inputElement, errorMessage, formElement, settings) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (inputElement, settings) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (inputElement, formElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, formElement, settings);
    } else {
        hideInputError(inputElement, settings);

    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, formElement, settings);
            validateSaveButton(formElement, settings, inputList);
        });
        validateSaveButton(formElement, settings, inputList);
    });
};

const validateSaveButton = (formElement, settings, inputList) => {
    const saveButton = formElement.querySelector(settings.submitButtonSelector);
    for (const inputElement of inputList) {
        if (!inputElement.validity.valid || inputElement.value === "") {
            saveButton.disabled = true;
            break
        } else {
            saveButton.disabled = false;
        };
    }
}

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll('form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, settings);
    });
};

enableValidation({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
})