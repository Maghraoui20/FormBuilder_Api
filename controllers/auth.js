const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require('../models/user');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');

exports.signup = (req, res) => {
     // console.log('req.body', req.body);
    const user = new User(req.body);
   // console.log(user);
    user.save((err, user) => {
        if (err) {
            console.log(err,"eroor");
            return res.status(401).json({
                error: 'User with that email is already exist'
            });        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};


exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // retrun response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'Signout success!' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});



const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
