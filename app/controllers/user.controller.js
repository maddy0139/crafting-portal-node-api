const User = require("../models/user.model");
const crypto = require("crypto");
const Response = require("../responses/Response");

exports.create = (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  // if (firstName && lastName && email && password ) {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  const user = new User(req.body);
  user
    .save()
    .then(result => {
      res.status(201).send({
        status: "SUCCESS",
        id: result._id
      });
    })
    .catch(error => {
      res.status(400).send({
        status: "Failed",
        reason: error.message
      });
    });
  // } else {
  //     res.status(400).send({
  //         status: 'Failed',
  //         reason: 'Validation failed'
  //     })
  // }
};

// exports.findOne = ((req,res) => {
//     User.findById(req.params.userId)
//     .then((user) => {
//         if(!user){
//             res.status(404).send({
//                 message: 'User not found with id' + req.params.userId
//             });
//         }
//         res.send(user);
//     })
//     .catch((error) => {
//         res.status(500).send({
//             message: 'Internal Server error'
//         })
//     });
// });

exports.findOne = (req, res) => {
  User.find({ username: req.params.username })
    .then(user => {
      if (!user) {
        res.status(404).send({
          status: "Failed",
          reason: "User not found with id" + req.params.username
        });
      }
      res.send({
        user,
        status: "Success"
      });
    })
    .catch(error => {
      res.status(500).send({
        status: "Failed",
        reason: "Internal Server error"
      });
    });
};

exports.existsByUsername = (req, res) => {
  User.find({ username: req.query.userName })
    .then(user => {
      if (!user.length) {
        res.send({
          available: true,
          message: "Username is available"
        });
      } else {
        res.send({
          available: false,
          message: "Username is already taken!"
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: "Internal Server error"
      });
    });
};

exports.existsByEmail = (req, res) => {
  User.find({ email: req.query.email })
    .then(user => {
      if (!user.length) {
        res.send({
          available: true,
          message: "email is available"
        });
      } else {
        res.send({
          available: false,
          message: "Email Address already in use!"
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: "Internal Server error"
      });
    });
};
