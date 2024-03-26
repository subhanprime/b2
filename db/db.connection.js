const mongoose = require('mongoose');
const { endpoint } = require('../config/config');

// we can use the remote mongodb url or we can use docker mongodb service

mongoose
  .connect(endpoint, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));
