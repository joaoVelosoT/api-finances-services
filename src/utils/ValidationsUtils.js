const isMongoID = (id) => {
  if (!id || typeof id != "string") {
    return {
      success: false,
      error: {
        code: 400,
        details: {
          cause: "'id' is required and must be a string",
        },
      },
    };
  }

  // Validando se o id enviado esta correto, pos o id do mongodb e composto por 24 caracteres
  if (id.length > 24 || id.length < 24) {
    return {
      success: false,
      error: {
        code: 400,
        details: {
          cause: "The id send is not a mongoID",
        },
      },
    };
  }

  return {
    success : true
  }
};

module.exports = isMongoID;
