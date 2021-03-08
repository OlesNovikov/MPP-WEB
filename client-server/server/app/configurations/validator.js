export class Validator {

    constructor() { }

    emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    positiveIntegerReqex = /^\d+$/i;

    fieldExist(key, value) {
        const errorMessage = `'${key}' field is required`;
        if (!value) {
            return errorMessage;
        }

        return !value.length ? errorMessage : null;
    }

    validateLength(key, value, minLength, maxLength) {
        return value.length > maxLength || value.length < minLength 
            ? `${key} length should be in diapasone ${minLength} - ${maxLength}` 
            : null;
    }

    validateEmail(email) {
        const key = 'email';
        return (this.validateRegexp(key, email, this.emailRegex) || '')
            .concat(this.fieldExist(key, email) || '');
    }

    validatePositiveNumber(key, value) {
        return this.validateRegexp(key, value, this.positiveIntegerReqex);
    }

    isIncludeValue(currentValue, possibleValues) {
        return !currentValue || !possibleValues.includes(currentValue) ? `There isn't value ${currentValue} in suggested list` : null;
    }

    validateRegexp(key, value, regexp) {
        return !regexp.test(value) ? `${key} should be as following: email@gmail.com` : null;
    }
}
