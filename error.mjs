const errorCapture = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const errorController = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err); // Prevent sending headers twice
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  if (process.env.NODE_ENV === "development") {
    return res.json({
      devError: err.message,
      error: err.productionMessage,
      stack: err.stack,
    });
  }

  res.json({
    error: err.productionMessage || "Something went wrong",
  });
};

class CustomError extends Error {
  constructor(err, code, message) {
    super(err?.message || message || "Unknown error");
    this.name = this.constructor.name; // Better error logs

    if (err?.stack) {
      this.stack = err.stack;
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.statusCode = code;
    this.productionMessage = message;
  }
}

export { errorCapture, errorController, CustomError };
