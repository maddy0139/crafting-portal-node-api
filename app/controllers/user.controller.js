const User = require('../models/user.model');
const crypto = require('crypto');

exports.create = ((req,res) => {
    if(!req.body){
        res.status(400).send({
            message: 'body can not be empty'
        });
    }
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                        .update(req.body.password)
                                        .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    const user = new User(req.body);
    user.save()
    .then((result) => {
        res.status(201).send({id: result._id});
    });
});

exports.findOne = ((req,res) => {
    User.findById(req.params.userId)
    .then((user) => {
        if(!user){
            res.status(404).send({
                message: 'User not found with id' + req.params.userId
            });
        }
        res.send(user);
    })
    .catch((error) => {
        res.status(500).send({
            message: 'Internal Server error'
        })
    });
});
