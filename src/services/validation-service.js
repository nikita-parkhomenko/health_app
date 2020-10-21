
// configuration
const passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
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
        if (!value) return false;
        // at least one number, one lowercase and one uppercase letter
        // at least four characters
        return passwordFormat.test(value);
    }
}

export default ValidationService;
