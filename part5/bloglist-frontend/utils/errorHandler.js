
const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case "ValidationError": {
        console.log("validation error")
      return response.status(400).json({
        error: error.message,
      });
    }
    case "JsonWebTokenError": {
      return response.status(401).json({
        error: "invalid token",
      });
    }
    default:
      return response.status(400).json({
        error: error.message,
      });
  }
};

module.exports = errorHandler