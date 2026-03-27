export default function validateEmail(target) {
    if (typeof target !== 'string') {
        return {
            is: false,
            message: 'invalid_type'
        };
    }

    const value = target.trim();

    if (!value) {
        return {
            is: false,
            message: 'empty'
        };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        return {
            is: false,
            message: 'invalid_email'
        };
    }

    return {
        is: true,
        message: 'valid'
    };
}