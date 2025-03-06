function errorHandler(err, req, res, next) {

    console.log(err);

    let status = 500;
    let message = 'Internal Server Error';

    switch (err.name) {
        case 'SequelizeValidationError':
            status = 400;
            message = err.errors.map(el => el.message);
            break;
        case 'SequelizeUniqueConstraintError':
            status = 400;
            message = err.errors.map(el => el.message);
            break;
        case 'SequelizeEmptyResultError':
            status = 404;
            message = 'Data not found';
            break;
        case 'SequelizeConnectionError':
            status = 500;
            message = 'Database connection error';
            break;
        case 'SequelizeDatabaseError':
            status = 500;
            message = 'Database error';
            break;
        case 'SequelizeForeignKeyConstraintError':
            status = 400;
            message = 'Foreign key constraint error';
            break;
        case "ValidationError":
            status = 400;
            message = err.message;
            break;
    }

    res.status(status).json({ message });
}

module.exports = errorHandler;