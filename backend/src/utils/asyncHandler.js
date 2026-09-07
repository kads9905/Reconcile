const asynHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err));
    };
};

export { asynHandler };

// its job is to automatically catch errors in async controllers
// and send them to ur global error handler.