const { Users } = require('../database');
const { Types } = require('mongoose');

module.exports.getUserInfo = async (req, res) => {
  const response = {
    user_id: req.params.id,
    results: []
  }
  let findUser = await Users.find({ _id: req.params.id});

  response.results = findUser;

  res.status(200).send(response);
}

module.exports.createNewUser = async (req, res) => {

  let newUser = new Users({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
    ratings_reviews: [],
    transactions: []
  })

  newUser.save()
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(400))
}

module.exports.updateUserInfo = async (req, res) => {
  let filter = { _id: req.params.id};
  let update = {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location
  }

    // const updateInfo = await Users.updateOne(filter, update, {new: true});
    // return res.status(200).send(updateInfo);

  const updateInfo = await Users.updateOne(filter, update, {new: true}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });

}
