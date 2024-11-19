class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends HttpError {
    constructor (message) {
        super(message, 400);
    }
}

class UnauthorizedError extends HttpError {
    constructor (message) {
        super(message, 401);
    }
}

class InvalidCredentialError extends HttpError {
    constructor(message) {
        super(message, 401);
    }
}

class ForbiddenError extends HttpError {
    constructor (message) {
        super(message, 403);
    }
}

class NotFoundError extends HttpError {
    constructor (message) {
        super(message, 404);
    }
}

class UserExistError extends HttpError {
    constructor(message) {
        super(message, 200);
    }
}

module.exports = {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    UserExistError,
    InvalidCredentialError
};