
  const successResponse = (message, data) => {
    if (!data) {
        return {
            message,
            status: "success",
        };
    }
    if (!message) {
      return {
          status: "success",
          data
      };
  }

    return {
      message,
      status: "success",
      data
    };
  };
  

  const errorResponse = (message) => {
    return {
        status: "error",
        message,
    };
  };

  const failResponse = (message) => {
    return {
        status: "fail",
        message,
    };
  }

  module.exports = {
    errorResponse,
    failResponse,
    successResponse
  }
  