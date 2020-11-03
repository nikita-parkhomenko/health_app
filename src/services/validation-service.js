
// configuration
const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


class ValidationService {
    static isValidEmail(value) {
        if (!value) {
            return false;
        }
        const mail = value.trim();

        if (!mail.match(mailFormat)) {
            return false;
        }

        return true;
    }
    static isValidPassword(value) {
        if (!value.trim()) {
            return false
        }
        return true
    }
    static isValidName(value) {
        if (!value) {
            return false
        } else if (!value.trim()) {
            return false
        }
        return true
    }
}

export default ValidationService;
