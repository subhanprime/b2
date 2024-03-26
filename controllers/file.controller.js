function uploadSingle(req, res) {
  try {
    console.log('request body', req.body);
    res.send(req.file);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
}

module.exports = {
  uploadSingle,
};
