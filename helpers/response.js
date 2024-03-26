const success = (res, message, data) => {
  res.status(200).json({
    status: 'success',
    message,
    data,
  });
};
const bad = (res, message) => {
  res.status(400).json({
    status: 'Error',
    message,
  });
};

const notFound = (res, message = 'Not found!') => {
  res.status(404).json({
    status: 'Error',
    message: message,
  });
};

const badRequest = (res) => {
  res.status(400).json({
    status: 'Error',
    message: 'Bad request!',
  });
};

const serverError = (res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
};

const unauthorized = (res, message) => {
  res.status(401).json({
    status: 'Error',
    message,
  });
};

const forbidden = (res) => {
  res.status(403).json({
    status: 'Error',
    message: 'Forbidden',
  });
};

const setResponse = (res, { type, message = '', data = {} }) => {
  switch (type) {
    case 'success':
      success(res, message, data);
      break;
    case 'bad':
      bad(res, message);
      break;
    case 'badRequest':
      badRequest(res, message);
      break;
    case 'notFound':
      notFound(res, message);
      break;
    case 'serverError':
      serverError(res);
      break;
    case 'unauthorized':
      unauthorized(res, message);
      break;
    case 'forbidden':
      forbidden(res);
      break;

    default:
      console.log('please select correct type');
      break;
  }
};

module.exports = {
  setResponse,
};
