var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

/* GET user dashboard. */
router.get('/:userId', function(req, res) {
  res.send('respond with dashboard');
});

/* GET user messages. */
router.get('/:userId/messages', function(req, res) {
    userId = req.params.userId;

    User.load({criteria: {'_id': userId}}, function(err, user) {
        if (err) return res.status(404).send('user not found');

        Message.list({criteria: {user: user}}, function(err, messages) {
            res.send(JSON.stringify(messages));
        });
    });
});

/* Post user message. */
router.post('/:userId/messages', function(req, res) {
    var sessionUser = req.user;

    if (!sessionUser) {
        res.status(403).send('A session user is required');
    }

    var data = req.body;

    if (!data.text) {
        res.status(500).send('Invalid request body. ' + err);
    }

    var message = new Message({
        text: data.text,
        created: new Date(),
        user: sessionUser
    });

    message.save(function(err, message) {
        if (err) {
            res.status(500).send(err);
        }

        Message.populate(message, {path: 'user'}, function(err, message) {
            res.status(201).send(JSON.stringify(message));
        });
    });
});

module.exports = router;
