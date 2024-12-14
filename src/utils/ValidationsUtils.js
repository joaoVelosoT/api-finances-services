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
    success: true,
  };
};

const isDate = (date) => {
  try {
    var year = date.split("-")[0];
    if (year < 2024 || year.length > 4) {
      return false;
    }

    var month = date.split("-")[1];
    if (month.length > 2 || month > 12 || month < 1) {
      return false;
    }

    var day = date.split("-")[2];
    if (day.length > 2 || day < 1 || day > 31) {
      return false;
    }

    console.log(year);
    console.log(month);
    console.log(day);

    return true;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = { isMongoID, isDate };
